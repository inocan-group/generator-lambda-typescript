import { computerText, install } from "./index";

import Base from "yeoman-generator";
import chalk from "chalk";

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
