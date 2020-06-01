import {
  Generator,
  askAboutDatabase,
  askAboutLicense,
  askAboutRepo,
  askAboutTesting,
  askForNameAndDescription,
  getTransientState,
  setTransientState,
} from "../private";
import { IAwsProfile, addAwsProfile, confirmQuestion, getAwsIdentityFromProfile } from "do-devops";

import { askAboutAws } from "../questions";
import { getAwsProfileList } from "do-devops";

import chalk = require("chalk");

export async function prompting(ctx: Generator) {
  const config = ctx.config.getAll();
  const awsProfiles = await getAwsProfileList();
  const answers = await ctx.prompt([
    ...askForNameAndDescription({ ...config, guessedName: ctx.determineAppname() }),
    ...askAboutTesting(config),
    askAboutDatabase(config),
    askAboutLicense(config),
    ...askAboutRepo(config),
    ...askAboutAws(config, awsProfiles || {}),
  ]);

  // save repo-state
  Object.keys(answers)
    .filter((k) => k.slice(0, 1) != "_")
    .forEach((k) => ctx.config.set(k, answers[k]));
  ctx.config.save();

  // save transient state
  const transient = getTransientState();
  Object.keys(answers)
    .filter((k) => k.slice(0, 1) === "_" && k.slice(1, 2) !== "_")
    .forEach((k) => (transient[k] = answers[k]));
  setTransientState(transient);

  // special ops
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
      console.log(chalk`- there was a {red problem} using the AWS {italic credentials} you passed in!`);
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
}
