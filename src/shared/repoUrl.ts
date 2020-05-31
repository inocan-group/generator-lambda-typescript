import { GitHost } from "../questions/askAboutRepo";
import { IDictionary } from "common-types";

/**
 * Given the config object from Yeoman, figures out what the URL to the repo should be
 * or makes it's best guess
 */
export function repoUrl(config: IDictionary) {
  switch (config.repoHost) {
    case GitHost.github:
      return `https://github.com/${config.repoOrg}/${config.serviceName}`;
    case GitHost.bitbucket:
      return `https://bitbucket.org/${config.repoOrg}/${config.serviceName}`;
    case GitHost.gitlab:
      return `https://gitlab-related-url.com/${config.repoOrg}/${config.serviceName}`;
    default:
      return `https://your-git-host.com/${config.repoOrg}/${config.serviceName}`;
  }
}
