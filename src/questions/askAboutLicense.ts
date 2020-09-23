import { IDictionary } from "common-types";
import { getPackageJson } from "do-devops";
import { listQuestion } from "../private";

import inquirer = require("inquirer");
export const enum License {
  MIT = "MIT",
  BSD = "BSD",
  Apache = "Apache",
  GNU = "GNU",
  UNLICENSED = "UNLICENSED",
}

export function askAboutLicense(defaults: IDictionary) {
  return listQuestion({
    name: "license",
    message: "What license should this package operate under?",
    choices: [License.UNLICENSED, License.MIT, License.BSD, License.Apache, License.GNU],
    default: defaults.license || getPackageJson().license || License.MIT,
    when: !getPackageJson().license,
  });
}
