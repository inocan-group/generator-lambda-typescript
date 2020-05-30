import * as YeomanGenerator from "yeoman-generator";
import * as chalk from "chalk";

import { askAboutTesting, askForProjectName, computerText, install } from "./private";

export class Generator extends YeomanGenerator {
  constructor(args: any[], opts: any) {
    super(args, opts);
  }

  async initializing() {
    console.log(computerText);
    console.log(chalk`\nStarting the {green Lambda Typescript} generator. {italic For AWS functions with attitude!}\n`);
    const answers = await this.prompt([
      askForProjectName(this.config.getAll()),
      ...askAboutTesting(this.config.getAll()),
    ]);
    Object.keys(answers).forEach((key) => this.config.set(key, answers[key]));
    this.config.save();
  }

  install() {
    install(this);
  }
}
