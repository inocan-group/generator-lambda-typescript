"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.askAboutDocumentation = void 0;
const shared_1 = require("../shared");
const _types_1 = require("../@types");
function askAboutDocumentation(defaults) {
    return shared_1.listQuestion({
        name: "documentation",
        message: "Would you like this repo to have a documentation site:",
        choices: [
            _types_1.DocumentationSolution.NONE,
            _types_1.DocumentationSolution.vuepress,
            _types_1.DocumentationSolution.vitepress,
        ],
        default: defaults.documentation || _types_1.DocumentationSolution.NONE,
    });
}
exports.askAboutDocumentation = askAboutDocumentation;
