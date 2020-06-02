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
exports.copyFile = void 0;
const path_1 = require("path");
/**
 * Copies a file from source to destination; files should be specified with
 * path from root.
 *
 * @param ctx an instance of the Generator
 * @param file the filename (and any path needed to get there)
 */
function copyFile(ctx, file, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const source = path_1.join(ctx.sourceRoot(), file);
        const destination = path_1.join(ctx.destinationRoot(), file);
        ctx.fs.copy(source, destination, options);
    });
}
exports.copyFile = copyFile;
