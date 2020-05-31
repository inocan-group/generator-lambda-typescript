"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.askForNameAndDescription = void 0;
const do_devops_1 = require("do-devops");
const private_1 = require("../private");
function askForNameAndDescription(defaults) {
    return [
        private_1.inputQuestion({
            name: "serviceName",
            message: "What is the name of the serverless project (dasherized format preferred):",
            default: defaults.serviceName || do_devops_1.getPackageJson().name || defaults.guessedName.replace(/ /g, "-") || "",
            when: !defaults.serviceName || defaults.name !== do_devops_1.getPackageJson().name,
        }),
        private_1.inputQuestion({
            name: "serviceDescription",
            message: "Give a short description to your service",
            default: defaults.serviceDescription || do_devops_1.getPackageJson().description || "",
            when: !defaults.serviceDescription || defaults.serviceDescription !== do_devops_1.getPackageJson().description,
        }),
    ];
}
exports.askForNameAndDescription = askForNameAndDescription;
