import * as Base from "yeoman-generator";
import * as chalk from "chalk";

import { computerText, install } from "./index";

export type IGenerator = Base;

export class Generator extends Base {
  constructor(args: any[], opts: any) {
    super(args, opts);
  }

  initializing() {
    console.log(computerText);
    console.log(chalk`\nStarting the {green Lambda Typescript} generator. {italic For AWS functions with attitude!}\n`);
  }

  install() {
    install(this);
  }
}
