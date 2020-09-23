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
exports.documentation = void 0;
const private_1 = require("../../private");
function documentation(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const config = ctx.config.getAll();
        const hasDocsDir = private_1.destinationExists(ctx, "docs");
        if (!hasDocsDir && config.documentation) {
            const dictionary = {
                year: new Date().getFullYear(),
                name: config.serviceName,
                organization: config.repoOrg,
                repo: config.repoUrl,
            };
            private_1.copyTplDirectory(ctx, "docs/.vitepress", dictionary);
            private_1.copyTplDirectory(ctx, "docs", dictionary);
        }
    });
}
exports.documentation = documentation;
