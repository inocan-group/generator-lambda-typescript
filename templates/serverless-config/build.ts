import * as path from "path";

import { buildLambdaTypescriptProject, getServerlessBuildConfiguration } from "do-devops";
import { custom, packaging, plugins, provider, resources, service } from "./config-sections/index";

import { IServerlessAccountInfo } from "common-types";
import functions from "./functions/index";
import { promisify } from "util";
import stateMachines from "./stepFunctions/index";
import { writeFile } from "fs";

import chalk = require("chalk");

const write = promisify(writeFile);
function config(accountInfo: IServerlessAccountInfo) {
  const hasStepFunctions = accountInfo.devDependencies.includes("serverless-step-functions");
  return {
    ...service(accountInfo),
    ...packaging(accountInfo),
    ...custom(accountInfo),
    ...plugins(accountInfo),
    ...provider(accountInfo),
    ...resources(accountInfo),
    ...{ functions },
    ...(hasStepFunctions ? stateMachines : {}),
  };
}
/**
 * Converts all the configuration
 */
(async () => {
  try {
    // TODO: add in the argv/opts parsing
    await buildLambdaTypescriptProject({}, {}, config);
  } catch (e) {
    console.log(`Failed during "build" script run locally: {red ${e.message}}`);
    console.log(chalk`{grey ${e.stack}}`);

    process.exit();
  }
})();
