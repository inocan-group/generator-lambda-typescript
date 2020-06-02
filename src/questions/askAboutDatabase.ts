import { IDictionary } from "common-types";
import { listQuestion } from "../private";

import inquirer = require("inquirer");
export enum DbTech {
  rtdb = "firebase:real-time-database",
  firestore = "firebase:firestore-database",
  dynamodb = "dynamodb",
  other = "Other / None",
}

export function askAboutDatabase(defaults: IDictionary) {
  return listQuestion({
    name: "database",
    message: "What database technology will you use (as your primary source):",
    choices: [DbTech.rtdb, DbTech.firestore, DbTech.dynamodb, DbTech.other],
    default: defaults.database || DbTech.rtdb,
    when: !defaults.database,
  });
}
