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
const questions_1 = require("../questions");
const do_devops_1 = require("do-devops");
//#region dev-deps
const utilityDevDeps = ["rimraf", "chalk", "@types/rimraf", "@types/chalk", "js-yaml", "@types/js-yaml", "fx", "madge"];
const serverlessDevDeps = [
    "serverless",
    "serverless-pseudo-parameters",
    "serverless-step-functions",
    "serverless-log-forwarding",
];
const webpackRelated = ["webpack", "webpack-bundle-analyzer", "webpack-cli"];
const mocha = ["mocha", "chai", "@types/mocha", "@types/chai"];
const jest = ["jest", "ts-jest", "jest-babel", "jest-extended", "@types/jest"];
const otherDevDeps = [
    "js-yaml",
    "@types/js-yaml",
    "do-devops",
    "typescript",
    "ts-node",
    "eslint",
    "rimraf",
    "chalk",
    "netlify",
    "madge",
];
//#endregion
//#region deps
const utilityDeps = ["date-fns", "common-types"];
const serverlessDeps = ["aws-orchestrate", "aws-log", "aws-ssm"];
//#endregion
function install(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const config = ctx.config.getAll();
        const testing = (config.unitTesting = do_devops_1.UnitTestFramework.mocha
            ? mocha
            : (config.unitTesting = do_devops_1.UnitTestFramework.jest ? jest : []));
        const devDeps = [...utilityDevDeps, ...serverlessDevDeps, ...webpackRelated, ...testing, ...otherDevDeps];
        ctx.yarnInstall(devDeps, { dev: true });
        const deps = [...utilityDeps, ...serverlessDeps];
        if (config.database === questions_1.DbTech.firestore || config.database === questions_1.DbTech.rtdb) {
            deps.push("firebase-admin");
            deps.push("universal-fire");
            deps.push("firemodel");
        }
        ctx.yarnInstall(deps, { dev: false });
    });
}
exports.install = install;
