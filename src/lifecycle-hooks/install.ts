import { DbTech, askAboutDatabase } from "../questions";

import { Generator } from "../private";
import { UnitTestFramework } from "do-devops";

//#region dev-deps
const utilityDevDeps = ["rimraf", "chalk", "@types/rimraf", "@types/chalk"];
const serverlessDevDeps = [
  "serverless",
  "serverless-pseudo-parameters",
  "serverless-step-functions",
  "serverless-log-forwarding",
];
const webpackRelated = ["webpack", "webpack-bundle-analyzer", "webpack-cli"];
const mocha = ["mocha", "chai", "@types/mocha", "@types/chai"];
const jest = ["jest"];
const otherDevDeps = ["js-yaml", "do-devops", "typescript", "ts-node", "eslint", "rimraf", "chalk", "netlify", "madge"];
//#endregion

//#region deps
const utilityDeps = ["date-fns", "common-types"];
const serverlessDeps = ["aws-orchestrate", "aws-log", "aws-ssm"];
//#endregion

export async function install(ctx: Generator) {
  const config = ctx.config.getAll();
  const testing = (config.unitTesting = UnitTestFramework.mocha
    ? mocha
    : (config.unitTesting = UnitTestFramework.jest ? jest : []));

  const devDeps = [...utilityDevDeps, ...serverlessDevDeps, ...webpackRelated, ...testing, ...otherDevDeps];
  ctx.yarnInstall(devDeps, { dev: true });

  const deps = [...utilityDeps, ...serverlessDeps];

  if (config.database === DbTech.firestore || config.database === DbTech.rtdb) {
    deps.push("firebase-admin");
    deps.push("universal-fire");
    deps.push("firemodel");
  }
  ctx.yarnInstall(deps, { dev: false });
}
