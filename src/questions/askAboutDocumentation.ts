import { IDictionary } from "common-types";
import { confirmQuestion } from "../private";

import inquirer = require("inquirer");

export function askAboutDocumentation(defaults: IDictionary) {
  return confirmQuestion({
    name: "documentation",
    message: "Would you like this repo to have a documentation site (using Vitepress):",
    default: defaults.documentation || false,
  });
}
