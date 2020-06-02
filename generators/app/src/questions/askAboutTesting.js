"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.askAboutTesting = void 0;
const do_devops_1 = require("do-devops");
const private_1 = require("../private");
function askAboutTesting(defaults) {
    return [
        private_1.listQuestion({
            name: "testFramework",
            message: "What test framework will you use (mocha/chai is recommended):",
            choices: ["mocha/chai", "jest", "ava", "other"],
            default: defaults.testFramework || do_devops_1.hasDevDependency("jest") ? "jest" : "mocha/chai",
        }),
        private_1.listQuestion({
            name: "testFilePattern",
            message: "How will your test files be identified?",
            choices: [
                "test/**/*.spec.ts",
                "test/**/*-spec.ts",
                "tests/**/*-spec.ts",
                "tests/**/*-spec.ts",
                "src/**/*-spec.ts",
                "src/**/*.spec.ts",
            ],
            default: defaults.testFilePattern || "test/**/*-spec.ts",
            when: !defaults.testFilePattern,
        }),
    ];
}
exports.askAboutTesting = askAboutTesting;
