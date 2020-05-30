import { getPackageJson, hasDevDependency } from "do-devops";
import { inputQuestion, listQuestion } from "../../private";

import { IDictionary } from "common-types";

import inquirer = require("inquirer");

export function askAboutTesting(defaults: IDictionary) {
  return [
    listQuestion({
      name: "testFramework",
      message: "What test framework will you use (mocha/chai is recommended):",
      choices: ["mocha/chai", "jest", "ava", "other"],
      default: defaults.testFramework || hasDevDependency("jest") ? "jest" : "mocha/chai",
    }),
    listQuestion({
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
