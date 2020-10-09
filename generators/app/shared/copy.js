"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyConfigurator = void 0;
const globby_1 = require("globby");
exports.copyConfigurator = (ctx) => {
    /**
     * Copies a file, files, or glob patterns of files from the source templates into
     * the destination repo.
     */
    const copy = (files, options = {}) => {
        let files = [];
        if (options.isGlob) {
            files = globby_1.default();
        }
        return Promise.resolve();
    };
    return copy;
};
