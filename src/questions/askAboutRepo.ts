import { IDictionary, IPackageJson } from "common-types";
import { License, inputQuestion, listQuestion, repoUrl } from "../private";
import { getFileFromHomeDirectory, getPackageJson, findOrgFromGitRemote } from "do-devops";

export const enum GitHost {
  github = "github",
  bitbucket = "bitbucket",
  gitlab = "gitlab",
  other = "other",
}

export const USER_REPO_ORGS = ".repo-orgs.json";

export function askAboutRepo(defaults: IDictionary, repoOrg: string | false) {
  const userRepoOrgs = getFileFromHomeDirectory(USER_REPO_ORGS, true);
  const userOrgs = userRepoOrgs ? Array.from(new Set<string>(JSON.parse(userRepoOrgs))) : [];
  const orgs = repoOrg ? [repoOrg].concat(...userOrgs) : userOrgs;

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
          return defaults.repoHost || defaults.license === License.UNLICENSED
            ? GitHost.bitbucket
            : GitHost.github;
        }

        return pkgJson.repository.includes("github")
          ? GitHost.github
          : pkgJson.repository.includes("bitbucket")
          ? GitHost.bitbucket
          : defaults.repoHost || GitHost.other;
      },
      when: !defaults.repoHost,
    }),
    listQuestion({
      name: "repoOrg",
      message: "What organization/group will your repo be under:",
      choices: orgs,
      when: !defaults.repoOrg && orgs.length > 0,
    }),
    inputQuestion({
      name: "repoOrg",
      message: `What organization/group will your repo be under:`,
      default: defaults.repoOrg,
      when: (current) => !defaults.repoOrg && (!current.repoOrg || current.repoOrg === "OTHER"),
    }),
    inputQuestion({
      name: "repoUrl",
      message: "Please validate that this is the right URL for your repo",
      default: (current: IDictionary) =>
        getPackageJson().repository
          ? getPackageJson().repository
          : repoUrl({ ...defaults, ...current }),
      when: (current) =>
        current.repoOrg !== defaults.repoOrg || current.repoHost !== defaults.repoHost,
    }),
  ];
}
