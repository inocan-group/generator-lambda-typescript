"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.destinationExists = void 0;
/**
 * Checks whether a file or directory exists in the destination
 *
 * @param ctx the generator instance
 * @param path the path in the destination you want to check for existance
 */
function destinationExists(ctx, path) {
    return ctx.fs.exists(ctx.destinationPath(path));
}
exports.destinationExists = destinationExists;
