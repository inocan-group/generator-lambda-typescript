import {
  Generator,
  askAboutDatabase,
  askAboutLicense,
  askAboutRepo,
  askAboutTesting,
  askForNameAndDescription,
  getTransientState,
  setTransientState,
  askAboutDocumentation,
} from "../private";
import {
  IAwsProfile,
  addAwsProfile,
  confirmQuestion,
  getAwsIdentityFromProfile,
  getFileFromHomeDirectory,
  saveFileToHomeDirectory,
  findOrgFromGitRemote,
} from "do-devops";
import { USER_REPO_ORGS, askAboutAws } from "../questions";

import { IDictionary } from "common-types";
import { getAwsProfileList } from "do-devops";

import chalk = require("chalk");
import inquirer = require("inquirer");

export async function prompting(ctx: Generator) {
  const config = ctx.config.getAll();
  const awsProfiles = await getAwsProfileList();
  const repoOrg = await findOrgFromGitRemote();
  let answers: inquirer.Answers;
  try {
    answers = await ctx.prompt([
      ...askForNameAndDescription({ ...config, guessedName: ctx.determineAppname() }),
      ...askAboutTesting(config),
      askAboutDatabase(config),
      askAboutDocumentation(config),
      askAboutLicense(config),
      ...askAboutRepo(config, repoOrg),
      ...askAboutAws(config, awsProfiles || {}),
    ]);
  } catch (e) {
    process.exit();
  }

  // save repo-state
  Object.keys(answers)
    .filter((k) => k.slice(0, 1) != "_")
    .forEach((k) => ctx.config.set(k, transformValue(answers, k)));
  ctx.config.save();

  // save transient state
  const transient = getTransientState();
  Object.keys(answers)
    .filter((k) => k.slice(0, 1) === "_" && k.slice(1, 2) !== "_")
    .forEach((k) => (transient[k] = transformValue(answers, k)));
  setTransientState(transient);

  // special ops: set profile
  if (answers.__awsAccessKey && answers.__awsSecretKey && answers.awsProfile) {
    const profile: IAwsProfile = {
      aws_access_key_id: answers.__awsAccessKey,
      aws_secret_access_key: answers.__awsSecretKey,
      region: answers.awsRegion,
    };
    addAwsProfile(answers.awsProfile, profile);
    try {
      const identity = await getAwsIdentityFromProfile(profile);
      ctx.config.set("awsAccount", identity.accountId);
      ctx.config.save();
    } catch (e) {
      console.log(
        chalk`- there was a {red problem} using the AWS {italic credentials} you passed in!`
      );
      console.log(chalk`- error was: {grey ${e.message}}`);

      console.log(
        chalk`- {bold NOTE:} the profile entry {italic has} been added to your credentials file\n  which can be found at {blue ~/.aws/credentials} under the heading [${answers.awsProfile}]\n  and it will need to be updated before you can deploy\n`
      );
      const response = await ctx.prompt([
        confirmQuestion({
          message: "Press enter to confirm and continue installing this scaffold's files",
          name: "continue",
        }),
      ]);
      if (!response.continue) {
        process.exit();
      }
    }
  }

  // special ops: save customer repos
  const currentUserRepos = getFileFromHomeDirectory(USER_REPO_ORGS, true);
  if (!currentUserRepos || JSON.parse(currentUserRepos).includes(answers.repoOrg)) {
    const current = currentUserRepos ? JSON.parse(currentUserRepos) : [];
    saveFileToHomeDirectory(USER_REPO_ORGS, JSON.stringify(current.concat(answers.repoOrg)));
  }
}

const conversions: IDictionary = {
  _awsProfile: {
    NONE: "",
  },
  _awsRegion: {
    "NO DEFAULT": "",
  },
};

function transformValue<T extends IDictionary>(answers: T, key: keyof T & string) {
  return conversions[key] && conversions[key][answers[key]] !== undefined
    ? conversions[key][answers[key]]
    : answers[key];
}
