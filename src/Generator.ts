import YeomanGenerator from "yeoman-generator";
import chalk from "chalk";

import { closure, computerText, install, prompting, writing } from "./private";
import { buildScriptConfigurator, copyConfigurator } from "./shared";

export class Generator extends YeomanGenerator {
  constructor(args: any[], opts: any) {
    super(args, opts);
    copyConfigurator(this);
    buildScriptConfigurator(this);
  }

  async initializing() {
    console.log(computerText);
    console.log(
      chalk`\nStarting the {green Lambda Typescript} generator. {italic AWS functions with attitude!}\n`
    );
  }

  async prompting() {
    await prompting(this);
  }

  async writing() {
    await writing(this);
  }

  async install() {
    await install(this);
  }

  async end() {
    await closure(this);
  }
}
