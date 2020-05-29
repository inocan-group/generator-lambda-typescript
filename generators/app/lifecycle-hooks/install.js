"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.install = void 0;
//#region dev-deps
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
//#endregion
//#region deps
const utilityDeps = ["date-fns", "common-types"];
const serverlessDeps = ["aws-orchestrate", "aws-log", "aws-ssm"];
const firebaseDeps = ["universal-fire", "firemodel"];
//#endregion
function install(ctx) {
    const devDeps = [...typings, ...serverlessDevDeps, ...webpackRelated, ...testingDevDeps, ...otherDevDeps];
    ctx.yarnInstall(devDeps, { dev: true });
    const deps = [...utilityDeps, ...serverlessDeps, ...firebaseDeps];
    ctx.yarnInstall(deps, { dev: false });
}
exports.install = install;
