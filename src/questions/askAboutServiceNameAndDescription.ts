import { IDictionary } from "common-types";
import { getPackageJson } from "do-devops";
import { inputQuestion } from "../private";

import inquirer = require("inquirer");

export function askForNameAndDescription(defaults: IDictionary) {
  return [
    inputQuestion({
      name: "serviceName",
      message: "What is the name of the serverless project (dasherized format preferred):",
      default: defaults.serviceName || getPackageJson().name || defaults.guessedName.replace(/ /g, "-") || "",
      when: !defaults.serviceName || defaults.name !== getPackageJson().name,
    }),
    inputQuestion({
      name: "serviceDescription",
      message: "Give a short description to your service",
      default: defaults.serviceDescription || getPackageJson().description || "",
      when: !defaults.serviceDescription || defaults.serviceDescription !== getPackageJson().description,
    }),
  ];
}
