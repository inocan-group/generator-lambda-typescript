"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repoUrl = void 0;
/**
 * Given the config object from Yeoman, figures out what the URL to the repo should be
 * or makes it's best guess
 */
function repoUrl(config) {
    switch (config.repoHost) {
        case "github" /* github */:
            return `https://github.com/${config.repoOrg}/${config.serviceName}`;
        case "bitbucket" /* bitbucket */:
            return `https://bitbucket.org/${config.repoOrg}/${config.serviceName}`;
        case "gitlab" /* gitlab */:
            return `https://gitlab-related-url.com/${config.repoOrg}/${config.serviceName}`;
        default:
            return `https://your-git-host.com/${config.repoOrg}/${config.serviceName}`;
    }
}
exports.repoUrl = repoUrl;
