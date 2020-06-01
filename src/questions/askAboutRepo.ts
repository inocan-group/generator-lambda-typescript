import { IDictionary, IPackageJson } from "common-types";
import { License, inputQuestion, listQuestion, repoUrl } from "../private";

import { getPackageJson } from "do-devops";

export const enum GitHost {
  github = "github",
  bitbucket = "bitbucket",
  gitlab = "gitlab",
  other = "other",
}

export function askAboutRepo(defaults: IDictionary) {
  return [
    listQuestion({
      name: "repoHost",
      message: "Who will you use to host your GIT repo:",
      choices: [GitHost.github, GitHost.bitbucket, GitHost.gitlab, GitHost.other],
      default: () => {
        let pkgJson: IPackageJson;
        try {
          pkgJson = getPackageJson();
          if (!pkgJson.repository) {
            throw new Error("no respository property to work off of");
          }
        } catch (e) {
          return defaults.repoHost || defaults.license === License.Proprietary ? GitHost.bitbucket : GitHost.github;
        }

        return pkgJson.repository.includes("github")
          ? GitHost.github
          : pkgJson.repository.includes("bitbucket")
          ? GitHost.bitbucket
          : defaults.repoHost || GitHost.other;
      },
      when: !defaults.repoHost,
    }),
    inputQuestion({
      name: "repoOrg",
      message: "What organization/group will your repo be under:",
      default: defaults.repoOrg,
      when: !defaults.repoOrg,
    }),
    inputQuestion({
      name: "repoUrl",
      message: "Please validate that this is the right URL for your repo",
      default: (current: IDictionary) =>
        getPackageJson().repository ? getPackageJson().repository : repoUrl({ ...defaults, ...current }),
      when: true,
    }),
  ];
}
