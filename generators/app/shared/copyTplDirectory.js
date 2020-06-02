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
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyTplDirectory = void 0;
const path_1 = require("path");
const globby = require("globby");
/**
 * Copies directories/subdirectories from source to destination while injecting variables into
 * the files which have template tags in them.
 *
 * @param ctx an instance of the Generator
 * @param dir the relative directory path which you want to copy
 * @param valueDictionary the dictionary of name/value pairs which will be injected into the docs
 */
function copyTplDirectory(ctx, dir, valueDictionary) {
    return __awaiter(this, void 0, void 0, function* () {
        const fqDir = path_1.join(ctx.sourceRoot(), dir);
        const files = (yield globby(`${fqDir}/**/*`)).map((f) => f.replace(ctx.sourceRoot(), ""));
        files.forEach((f) => ctx.fs.copyTpl(path_1.join(ctx.sourceRoot(), f), path_1.join(ctx.destinationPath(), f), valueDictionary));
    });
}
exports.copyTplDirectory = copyTplDirectory;
