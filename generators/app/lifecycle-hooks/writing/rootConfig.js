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
exports.rootConfig = void 0;
const date_fns_1 = require("date-fns");
/** files in the root of the repo; mainly focused on config of this or that */
function rootConfig(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const config = ctx.config.getAll();
        console.log({ config });
        if (!ctx.fs.exists("package.json")) {
            ctx.fs.copyTpl(ctx.templatePath("package.json"), ctx.destinationPath("package.json"), config);
        }
        ["tsconfig.json", "tsconfig-cjs.json", "wallaby.js", "webpack.config.js", "_gitignore", "do.config.js"].forEach((f) => {
            ctx.fs.copy(ctx.templatePath(f), ctx.destinationPath(returnDot(f)), { dot: true });
        });
        if (config.license === "MIT" /* MIT */ && !ctx.fs.exists(ctx.destinationPath("LICENSE"))) {
            const year = date_fns_1.format(new Date(), "yyyy");
            ctx.fs.copyTpl(ctx.templatePath("LICENSE"), ctx.destinationPath("LICENSE"), { year });
        }
        if (config.license !== "Proprietary" /* Proprietary */) {
            ctx.fs.copy(ctx.templatePath("_travis.yml"), ctx.destinationPath(".travis.yml"));
        }
    });
}
exports.rootConfig = rootConfig;
function returnDot(item) {
    return item.slice(0, 1) === "_" ? `.${item.slice(1)}` : item;
}
