import { IDictionary } from "common-types";
import { listQuestion } from "../shared";
import { DocumentationSolution } from "../@types";

export function askAboutDocumentation(defaults: IDictionary) {
  return listQuestion({
    name: "documentation",
    message: "Would you like this repo to have a documentation site:",
    choices: [
      DocumentationSolution.NONE,
      DocumentationSolution.vuepress,
      DocumentationSolution.vitepress,
    ],
    default: defaults.documentation || DocumentationSolution.NONE,
  });
}
