import { IDictionary } from "common-types";
import { getPackageJson } from "do-devops";
import { inputQuestion } from "../../shared";

import inquirer = require("inquirer");

export function askForProjectName(defaults: IDictionary) {
  return inputQuestion({
    name: "projectName",
    message: "What is the name of the serverless project (dasherized format preferred):",
    default: defaults.projectName || getPackageJson().name || "",
  });
}
