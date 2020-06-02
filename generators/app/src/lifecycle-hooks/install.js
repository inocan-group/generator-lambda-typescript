"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    return __awaiter(this, void 0, void 0, function* () {
        const devDeps = [...typings, ...serverlessDevDeps, ...webpackRelated, ...testingDevDeps, ...otherDevDeps];
        ctx.yarnInstall(devDeps, { dev: true });
        const deps = [...utilityDeps, ...serverlessDeps, ...firebaseDeps];
        ctx.yarnInstall(deps, { dev: false });
    });
}
exports.install = install;
