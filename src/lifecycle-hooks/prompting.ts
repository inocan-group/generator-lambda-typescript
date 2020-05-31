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

import { askAboutAws } from "../questions";
import { getAwsProfileList } from "do-devops";

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
  Object.keys(answers)
    .filter((k) => k.slice(0, 1) != "_")
    .forEach((key) => ctx.config.set(key, answers[key]));
  ctx.config.save();
  const transient = getTransientState();
  Object.keys(answers)
    .filter((k) => k.slice(0, 1) === "_")
    .forEach((key) => (transient[key] = answers[key]));
  setTransientState(transient);
}
