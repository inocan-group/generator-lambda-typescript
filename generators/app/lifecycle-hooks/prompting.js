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
exports.prompting = void 0;
const private_1 = require("../private");
const do_devops_1 = require("do-devops");
const questions_1 = require("../questions");
const do_devops_2 = require("do-devops");
const chalk = require("chalk");
function prompting(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const config = ctx.config.getAll();
        const awsProfiles = yield do_devops_2.getAwsProfileList();
        const answers = yield ctx.prompt([
            ...private_1.askForNameAndDescription(Object.assign(Object.assign({}, config), { guessedName: ctx.determineAppname() })),
            ...private_1.askAboutTesting(config),
            private_1.askAboutDatabase(config),
            private_1.askAboutLicense(config),
            ...private_1.askAboutRepo(config),
            ...questions_1.askAboutAws(config, awsProfiles || {}),
        ]);
        // save repo-state
        Object.keys(answers)
            .filter((k) => k.slice(0, 1) != "_")
            .forEach((k) => ctx.config.set(k, answers[k]));
        ctx.config.save();
        // save transient state
        const transient = private_1.getTransientState();
        Object.keys(answers)
            .filter((k) => k.slice(0, 1) === "_" && k.slice(1, 2) !== "_")
            .forEach((k) => (transient[k] = answers[k]));
        private_1.setTransientState(transient);
        // special ops
        if (answers.__awsAccessKey && answers.__awsSecretKey && answers.awsProfile) {
            const profile = {
                aws_access_key_id: answers.__awsAccessKey,
                aws_secret_access_key: answers.__awsSecretKey,
                region: answers.awsRegion,
            };
            do_devops_1.addAwsProfile(answers.awsProfile, profile);
            try {
                const identity = yield do_devops_1.getAwsIdentityFromProfile(profile);
                ctx.config.set("awsAccount", identity.accountId);
                ctx.config.save();
            }
            catch (e) {
                console.log(chalk `- there was a {red problem} using the AWS {italic credentials} you passed in!`);
                console.log(chalk `- error was: {grey ${e.message}}`);
                console.log(chalk `- {bold NOTE:} the profile entry {italic has} been added to your credentials file\n  which can be found at {blue ~/.aws/credentials} under the heading [${answers.awsProfile}]\n  and it will need to be updated before you can deploy\n`);
                const response = yield ctx.prompt([
                    do_devops_1.confirmQuestion({
                        message: "Press enter to confirm and continue installing this scaffold's files",
                        name: "continue",
                    }),
                ]);
                if (!response.continue) {
                    process.exit();
                }
            }
        }
    });
}
exports.prompting = prompting;
