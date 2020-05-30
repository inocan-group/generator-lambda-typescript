"use strict";

var Base = require("yeoman-generator");
var chalk = require("chalk");
const typings = ["@types/aws-sdk", "@types/lodash", "@types/rimraf", "@types/handlebars"];
const serverlessDevDeps = [
  "serverless",
  "serverless-pseudo-parameters",
  "serverless-step-functions",
  "serverless-log-forwarding",
];
const webpackRelated = ["webpack", "webpack-bundle-analyzer", "webpack-cli"];
const testingDevDeps = ["mocha", "chai", "@types/mocha", "@types/chai"];
const otherDevDeps = ["js-yaml", "do-devops", "typescript", "ts-node", "eslint", "rimraf", "chalk", "netlify", "madge"];
const utilityDeps = ["date-fns", "common-types"];
const serverlessDeps = ["aws-orchestrate", "aws-log", "aws-ssm"];
const firebaseDeps = ["universal-fire", "firemodel"];

const computerText = `
┌──────────────────────┐
│......................│
│......................│
│......................│
│......................│
│......................│
│......................│
│......................│
│......................│
└──────────────────────┘
 **********************
***                  ***
**              *******
****************\n`;

module.exports = Generator;

class Generator extends Base {
  constructor(args, opts) {
    super(args, opts);
  }
  initializing() {
    console.log(computerText);
    console.log(chalk`\nStarting the {green Lambda Typescript} generator. {italic For AWS functions with attitude!}\n`);
  }
  install() {
    const devDeps = [...typings, ...serverlessDevDeps, ...webpackRelated, ...testingDevDeps, ...otherDevDeps];
    ctx.yarnInstall(devDeps, { dev: true });
    const deps = [...utilityDeps, ...serverlessDeps, ...firebaseDeps];
    ctx.yarnInstall(deps, { dev: false });
  }
}
