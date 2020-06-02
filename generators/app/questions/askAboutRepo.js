"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.askAboutRepo = exports.USER_REPO_ORGS = void 0;
const private_1 = require("../private");
const do_devops_1 = require("do-devops");
exports.USER_REPO_ORGS = ".repo-orgs.json";
function askAboutRepo(defaults) {
    const userFile = do_devops_1.getFileFromHomeDirectory(exports.USER_REPO_ORGS, true);
    const userOrgs = userFile ? JSON.parse(userFile) : [];
    return [
        private_1.listQuestion({
            name: "repoHost",
            message: "Who will you use to host your GIT repo:",
            choices: ["github" /* github */, "bitbucket" /* bitbucket */, "gitlab" /* gitlab */, "other" /* other */],
            default: () => {
                let pkgJson;
                try {
                    pkgJson = do_devops_1.getPackageJson();
                    if (!pkgJson.repository) {
                        throw new Error("no respository property to work off of");
                    }
                }
                catch (e) {
                    return defaults.repoHost || defaults.license === "Proprietary" /* Proprietary */ ? "bitbucket" /* bitbucket */ : "github" /* github */;
                }
                return pkgJson.repository.includes("github")
                    ? "github" /* github */
                    : pkgJson.repository.includes("bitbucket")
                        ? "bitbucket" /* bitbucket */
                        : defaults.repoHost || "other" /* other */;
            },
            when: !defaults.repoHost,
        }),
        private_1.listQuestion({
            name: "repoOrg",
            message: "What organization/group will your repo be under:",
            choices: userOrgs.concat("OTHER"),
            when: !defaults.repoOrg && userOrgs.length > 0,
        }),
        private_1.inputQuestion({
            name: "repoOrg",
            message: `What organization/group will your repo be under:`,
            default: defaults.repoOrg,
            when: (current) => !defaults.repoOrg && (!current.repoOrg || current.repoOrg === "OTHER"),
        }),
        private_1.inputQuestion({
            name: "repoUrl",
            message: "Please validate that this is the right URL for your repo",
            default: (current) => do_devops_1.getPackageJson().repository ? do_devops_1.getPackageJson().repository : private_1.repoUrl(Object.assign(Object.assign({}, defaults), current)),
            when: (current) => current.repoOrg !== defaults.repoOrg || current.repoHost !== defaults.repoHost,
        }),
    ];
}
exports.askAboutRepo = askAboutRepo;
