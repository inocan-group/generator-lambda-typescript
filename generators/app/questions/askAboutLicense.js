"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.askAboutLicense = void 0;
const do_devops_1 = require("do-devops");
const private_1 = require("../private");
function askAboutLicense(defaults) {
    return private_1.listQuestion({
        name: "license",
        message: "What license should this package operate under?",
        choices: ["Proprietary" /* Proprietary */, "MIT" /* MIT */, "BSD" /* BSD */, "Apache" /* Apache */, "GNU" /* GNU */],
        default: defaults.license || do_devops_1.getPackageJson().license || "MIT" /* MIT */,
        when: !do_devops_1.getPackageJson().license,
    });
}
exports.askAboutLicense = askAboutLicense;
