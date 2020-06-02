"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.askAboutAws = void 0;
const common_types_1 = require("common-types");
const do_devops_1 = require("do-devops");
const private_1 = require("../private");
const chalk = require("chalk");
function askAboutAws(defaults, profiles) {
    const profileNames = Object.keys(profiles);
    return [
        private_1.listQuestion({
            name: "repoType",
            message: "Repos that host serverless functions broadly fall into two categories:\n\n1. Core functional services\n2. Utility libraries which are shared across many services/apps\n\nWe need to know which of these best describes this repo:",
            choices: ["core-services", "utility-library"],
            default: defaults.repoType,
        }),
        private_1.inputQuestion({
            name: "awsProfile",
            message: (current) => `Repos playing a role of a "core service" should have a default AWS Profile saved into the repo. Often\nusing the same name as the service is appropriate (aka, "${current.serviceName}") but it doesn't need to be:`,
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
        // inputQuestion({
        //   name: "awsAccount",
        //   message: `What is the AWS account ID for this account (typically 12 digit number)?:`,
        //   default: defaults.serviceName,
        //   when: (current) => !defaults.awsProfile && current.repoType === "core-services",
        // }),
        private_1.listQuestion({
            name: "_awsProfile",
            message: chalk `{bold Library/utility} repos are typically deployed into different environments so we\n  will not save a default AWS Profile and Region {italic into the repo} but we {italic can} save it\n  into {blue .yo-transient.json} file for you which makes it a default for {italic this cloning} of the repo but has no impact on others.\n  Leave it blank if you do not want this default behavior at all:`,
            choices: ["NONE"].concat(profileNames).concat("OTHER"),
            default: defaults._awsProfile || "NONE",
            when: (current) => current.repoType === "utility-library",
        }),
        private_1.listQuestion({
            name: "_awsRegion",
            message: chalk `Similarly to Profile, an {bold AWS Region} can be stated as a default region, however when choosing 'NO DEFAULT' this will lead to an interactive menu when deploying`,
            choices: ["NO DEFAULT"].concat(common_types_1.AWS_REGIONS),
            default: defaults.awsRegion,
            when: (current) => current.repoType === "utility-library",
        }),
        private_1.inputQuestion({
            name: "_awsRegion",
            message: chalk `choose a new profile name`,
            when: (current) => current.repoType === "utility-library" && current._awsRegion === "OTHER",
        }),
        // Profile chosen is not defined in user's credentials file
        do_devops_1.confirmQuestion({
            name: "__addMissingCredentials",
            message: (current) => chalk `You don't currently have the profile "${current.awsProfile || current._awsProfile}" in your credentials file,\ndo you have the {italic access} and {italic secret key} available? If so we can add it to your file\nfor you.`,
            when: (current) => (current._awsProfile !== "NONE" &&
                current.repoType === "utility-library" &&
                current._awsProfile &&
                !profileNames.includes(current._awsProfile)) ||
                (current.repoType === "core-services" && current.awsProfile && !profileNames.includes(current.awsProfile)),
        }),
        private_1.inputQuestion({
            name: "__awsAccessKey",
            message: "input your AWS access key:",
            when: (current) => current.__addMissingCredentials,
        }),
        private_1.inputQuestion({
            name: "__awsSecretKey",
            message: "input your AWS secret access key (this will not be saved except your own credentials file):",
            when: (current) => current.__addMissingCredentials,
        }),
    ];
}
exports.askAboutAws = askAboutAws;
