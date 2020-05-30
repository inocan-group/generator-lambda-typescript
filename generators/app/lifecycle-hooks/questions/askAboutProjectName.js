"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.askForProjectName = void 0;
const do_devops_1 = require("do-devops");
const shared_1 = require("../../shared");
function askForProjectName(defaults) {
    return shared_1.inputQuestion({
        name: "projectName",
        message: "What is the name of the serverless project (dasherized format preferred):",
        default: defaults.projectName || do_devops_1.getPackageJson().name || "",
    });
}
exports.askForProjectName = askForProjectName;
