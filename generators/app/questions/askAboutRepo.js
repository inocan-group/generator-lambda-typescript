"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.askAboutRepo = void 0;
const private_1 = require("../private");
const do_devops_1 = require("do-devops");
function askAboutRepo(defaults) {
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
        private_1.inputQuestion({
            name: "repoOrg",
            message: "What organization/group will your repo be under:",
            default: defaults.repoOrg,
            when: !defaults.repoOrg,
        }),
        private_1.inputQuestion({
            name: "repoUrl",
            message: "Please validate that this is the right URL for your repo",
            default: (current) => do_devops_1.getPackageJson().repository ? do_devops_1.getPackageJson().repository : private_1.repoUrl(Object.assign(Object.assign({}, defaults), current)),
            when: true,
        }),
    ];
}
exports.askAboutRepo = askAboutRepo;
