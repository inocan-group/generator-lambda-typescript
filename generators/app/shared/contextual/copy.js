"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyConfigurator = exports.copy = void 0;
const do_devops_1 = require("do-devops");
const path_1 = require("path");
const globby_1 = __importDefault(require("globby"));
let _copy;
/**
 * Copies a file, files, or glob patterns of files from the source templates into
 * the destination repo. Examples include:
 *
 * ```typescript
 * import { copy } from "@/shared";
 * // copy a single file
 * copy("foobar.txt");
 * // copy with template changes and changed dest file naming
 * copy("foobar-baz.txt", {
 *  dictionary: { year: 2020 },
 *  destination: (f,p) => f.replace("-baz", "")
 * })
 * // copy all files with .ts extension to destination
 * copy("**\/*.ts", { useGlob: true });
 * ```
 */
exports.copy = (files, options) => {
    if (!_copy) {
        throw new do_devops_1.DevopsError(`Attempt to copy template files before the copy command was initialized!`, "not-ready");
    }
    return _copy(files, options);
};
/**
 * Provides the `copy` command with the context it needs to do it's job
 *
 * @param ctx the Generator object
 */
exports.copyConfigurator = (ctx) => {
    const copy = (files, options = {}) => __awaiter(void 0, void 0, void 0, function* () {
        if (!Array.isArray(files)) {
            files = [files];
        }
        if (options.isGlob) {
            files = yield globby_1.default(files);
        }
        files.forEach((f) => {
            const source = path_1.join(ctx.sourceRoot(), f);
            const [dir, file] = convert(f, options.destination);
            if (options.dictionary) {
                ctx.fs.copyTpl(source, path_1.join(ctx.destinationPath(), dir, file), options.dictionary);
            }
            else {
                ctx.fs.copy(source, path_1.join(ctx.destinationPath(), dir, file));
            }
        });
        return Promise.resolve();
    });
    _copy = copy;
    return copy;
};
const defaultConverter = (file, dir) => {
    return [dir, file.replace(/^_/, ".")];
};
/**
 * Converts file and/or path using a converter (default or passed in) and then
 * returns a tuple as [dir, file]
 */
function convert(filepath, customConverter) {
    const [file, dir] = splitFileAndDir(filepath);
    const converter = customConverter || defaultConverter;
    const converted = converter(file, dir);
    const [convFile, convDir] = Array.isArray(converted) ? converted : [converted, dir];
    return [convFile, convDir];
}
function splitFileAndDir(filepath) {
    const parts = filepath.split(/[/\\]/);
    const dir = parts.length > 1 ? parts.slice(0, parts.length - 1).join("/") : ".";
    return [dir, parts.slice(-1).pop()];
}
function outputFilename(file, dir, converter) {
    if (!converter)
        return path_1.join(dir, file);
    const [newFile, newDir] = converter(file, dir);
    return path_1.join(newDir || dir, newFile);
}
