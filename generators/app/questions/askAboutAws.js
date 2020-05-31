"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.askAboutAws = void 0;
const common_types_1 = require("common-types");
const private_1 = require("../private");
const do_devops_1 = require("do-devops");
function askAboutAws(defaults) {
    const usersAwsProfiles = do_devops_1.getAwsProfileList();
    return [
        private_1.listQuestion({
            name: "repoType",
            message: "Repos that host serverless functions broadly fall into two categories:\n\n1. Core functional services\n2. Utility libraries which are shared across many services/apps\n\nWe need to know which of these best describes this repo:",
            choices: ["core-services", "utility-library"],
            default: defaults.repoType,
        }),
        private_1.inputQuestion({
            name: "awsProfile",
            message: (current) => `Repos playing a role of a "core service" should have a default profile saved. Often\nusing the same name as the service (aka, "${current.serviceName}") but it doesn't need to be:`,
            default: (current) => (current.repoType === "core-services" ? current.serviceName : undefined),
            when: (current) => !defaults.awsProfile && current.repoType === "core-services",
        }),
        private_1.listQuestion({
            name: "awsRegion",
            message: "What AWS region do you want to associate as your default region?",
            choices: common_types_1.AWS_REGIONS,
            default: (current) => defaults.awsRegion || current.repoType === "core-services" ? "us-east-1" : "",
            when: (current) => !defaults.awsRegion && current.repoType === "core-services",
        }),
        private_1.inputQuestion({
            name: "awsAccount",
            message: `What is the AWS account ID for this account (typically 12 digit number)?:`,
            default: defaults.serviceName,
            when: (current) => !defaults.awsProfile && current.repoType === "core-services",
        }),
        private_1.inputQuestion({
            name: "_awsProfile",
            message: `Library/utility repos are often deployed into different environments so having\na default profile and region saved in the repo doesn't make sense but in some cases\nit's valuable to have  :`,
            default: defaults.serviceName,
            when: (current) => !defaults.awsProfile || current.repoType === "utility-library",
        }),
        private_1.listQuestion({
            name: "_awsRegion",
            message: "What AWS region do you want to associate as your default region?",
            choices: common_types_1.AWS_REGIONS,
            default: defaults.awsRegion || "us-east-1",
            when: (current) => !defaults.awsRegion || current.repoType === "utility-library",
        }),
    ];
}
exports.askAboutAws = askAboutAws;
