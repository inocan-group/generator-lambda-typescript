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

    console.log(chalk`Starting the {green Lambda Typescript} generator (for AWS functions with attitude)`);
  }

  install() {
    install(this);
  }
}
