"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.askAboutTesting = void 0;
const do_devops_1 = require("do-devops");
const private_1 = require("../private");
function askAboutTesting(defaults) {
    return [
        private_1.listQuestion({
            name: "unitTesting",
            message: "What test framework will you use (mocha/chai is recommended):",
            choices: [do_devops_1.UnitTestFramework.mocha, do_devops_1.UnitTestFramework.jest, do_devops_1.UnitTestFramework.other],
            default: () => defaults.unitTesting ? defaults.unitTesting : do_devops_1.hasDevDependency("jest") ? "jest" : do_devops_1.UnitTestFramework.mocha,
            when: !defaults.unitTesting,
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
            default: () => defaults.testFilePattern || "test/**/*-spec.ts",
            when: !defaults.testFilePattern,
        }),
    ];
}
exports.askAboutTesting = askAboutTesting;
