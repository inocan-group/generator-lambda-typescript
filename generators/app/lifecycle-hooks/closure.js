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
exports.closure = void 0;
const simplegit = require("simple-git/promise");
const chalk = require("chalk");
const yosay = require("yosay");
function closure(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const config = ctx.config.getAll();
        const git = simplegit(ctx.destinationPath());
        try {
            const checkIsRepo = yield git.checkIsRepo();
            if (checkIsRepo) {
                console.log(chalk `{grey - This project was already setup as a git repo.}`);
            }
            else {
                console.log(chalk `{grey - this project has {italic not yet} been setup as a git repository yet ... will setup}`);
                yield git.init();
                console.log(chalk `- This project has been registered as a {bold git} project`);
            }
            if (config.repoUrl) {
                const remotes = yield git.getRemotes();
                if (remotes.length === 0) {
                    if (["bitbucket" /* bitbucket */, "github" /* github */].includes(config.repoHost)) {
                        const origin = "github" /* github */
                            ? `git@github.com:${config.repoOrg}/${config.serviceName}.git`
                            : `git@bitbucket.org:${config.repoOrg}/${config.serviceName}.git`;
                        yield git.addRemote("origin", origin);
                        console.log(chalk `- added "remote" for git repo: {italic grey ${origin}}`);
                    }
                    else {
                        console.log(chalk `- it appears the {green {italic remote}} for the repo has not been setup yet but it can not be done automatically yet for your git hosting provider (${config.repoHost})`);
                    }
                }
            }
        }
        catch (e) {
            console.log(`- attempts to setup git for you failed but that's our fault`);
            console.log(`- error message was: ${e.message}`);
            console.log(`\n{grey ${e.stack}\n`);
            console.log(chalk `- anyway, outside of the {bold git} fumble, all else is well :)`);
        }
        console.log(yosay(chalk `\n{green {bold Success!}}\nType "yarn do" for CLI help.`));
    });
}
exports.closure = closure;
