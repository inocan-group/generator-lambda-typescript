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
const shared_1 = require("../../shared");
function documentation(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const config = ctx.config.getAll();
        const hasDocsDir = private_1.destinationExists(ctx, "docs");
        if (config.documentation) {
            const dictionary = Object.assign({ year: new Date().getFullYear(), name: config.serviceName, organization: config.repoOrg, repo: config.repoUrl }, config);
            if (!hasDocsDir) {
                shared_1.copy("docs/getting-started/**", { isGlob: true, dictionary });
            }
            shared_1.buildScript("docs", `yarn ${config.documentation} serve docs`);
            shared_1.buildScript("docs:build", `yarn ${config.documentation} build docs`);
            switch (config.documentation) {
                case "vitepress":
                    yield shared_1.copy("docs/.vitepress/**", { isGlob: true, dictionary });
                    yield shared_1.copy("docs/index-vitepress.md", {
                        dictionary,
                        destination: (f) => f.replace("-vitepress", ""),
                    });
                    ctx.yarnInstall(["vitepress"], { dev: true });
                    break;
                case "vuepress":
                    yield shared_1.copy("docs/.vuepress/**", { isGlob: true, dictionary: ctx.config });
                    yield shared_1.copy("docs/index-vuepress.md", {
                        dictionary,
                        destination: (f) => f.replace("-vuepress", ""),
                    });
                    ctx.yarnInstall([
                        "vuepress",
                        "@vuepress/back-to-top",
                        "@vuepress/last-updated",
                        "@vuepress/medium-zoom",
                        "@vuepress/plugin-pwa",
                        "vuepress-plugin-mermaidjs",
                        "vuepress-plugin-autometa",
                    ], { dev: true });
                    break;
                default:
                    console.warn(`- The configuration expressed a desire for an unknown documentation system: ${config.documentation}. Ignoring.`);
            }
        }
    });
}
exports.documentation = documentation;
