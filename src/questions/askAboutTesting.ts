import { UnitTestFramework, hasDevDependency } from "do-devops";

import { IDictionary } from "common-types";
import { listQuestion } from "../private";

export function askAboutTesting(defaults: IDictionary) {
  return [
    listQuestion({
      name: "unitTesting",
      message: "What test framework will you use (mocha/chai is recommended):",
      choices: [UnitTestFramework.mocha, UnitTestFramework.jest, UnitTestFramework.other],
      default: () =>
        defaults.unitTesting ? defaults.unitTesting : hasDevDependency("jest") ? "jest" : UnitTestFramework.mocha,
      when: !defaults.unitTesting,
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
      default: () => defaults.testFilePattern || "test/**/*-spec.ts",
      when: !defaults.testFilePattern,
    }),
  ];
}
