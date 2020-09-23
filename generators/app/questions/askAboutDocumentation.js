"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.askAboutDocumentation = void 0;
const private_1 = require("../private");
function askAboutDocumentation(defaults) {
    return private_1.confirmQuestion({
        name: "documentation",
        message: "Would you like this repo to have a documentation site (using Vitepress):",
        default: defaults.documentation || false,
    });
}
exports.askAboutDocumentation = askAboutDocumentation;
