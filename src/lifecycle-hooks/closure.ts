import { Generator } from "../private";
import { GitHost } from "../questions";
import simplegit = require("simple-git/promise");
import chalk = require("chalk");
import yosay = require("yosay");

export async function closure(ctx: Generator) {
  const config = ctx.config.getAll();
  const git = simplegit(ctx.destinationPath());
  try {
    const checkIsRepo = await git.checkIsRepo();

    if (checkIsRepo) {
      console.log(chalk`{grey - This project was already setup as a git repo.}`);
    } else {
      console.log(chalk`{grey - this project has {italic not yet} been setup as a git repository yet ... will setup}`);

      await git.init();
      console.log(chalk`- This project has been registered as a {bold git} project`);
    }
    if (config.repoUrl) {
      const remotes = await git.getRemotes();
      if (remotes.length === 0) {
        if ([GitHost.bitbucket, GitHost.github].includes(config.repoHost)) {
          const origin = GitHost.github
            ? `git@github.com:${config.repoOrg}/${config.serviceName}.git`
            : `git@bitbucket.org:${config.repoOrg}/${config.serviceName}.git`;
          await git.addRemote("origin", origin);
          console.log(chalk`- added "remote" for git repo: {italic grey ${origin}}`);
        } else {
          console.log(
            chalk`- it appears the {green {italic remote}} for the repo has not been setup yet but it can not be done automatically yet for your git hosting provider (${config.repoHost})`
          );
        }
      }
    }
  } catch (e) {
    console.log(`- attempts to setup git for you failed but that's our fault`);
    console.log(`- error message was: ${e.message}`);
    console.log(`\n{grey ${e.stack}\n`);
    console.log(chalk`- anyway, outside of the {bold git} fumble, all else is well :)`);
  }

  console.log(yosay(`\n${chalk.bold("Success!")}\nType "yarn help" for CLI help.`));
}
