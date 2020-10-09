"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildScriptConfigurator = exports.buildScript = void 0;
const do_devops_1 = require("do-devops");
const path_1 = require("path");
const errors_1 = require("../../errors");
let _buildScript;
/**
 * Adds/updates the build scripts in `package.json` to include this command. If there's
 * a conflict then the user is asked before changing.
 *
 * @param scriptName the name in `package.json`'s "scripts" section
 * @param command the command to run when this script is called by yarn/npm
 */
exports.buildScript = (scriptName, command) => {
    if (!_buildScript) {
        throw new errors_1.GeneratorError(`Attemp to add a script name to package.json with buildScript() prior to it being initialized!`, "not-ready");
    }
    return _buildScript(scriptName, command);
};
exports.buildScriptConfigurator = (ctx) => {
    const bs = (scriptName, command) => {
        const pkgJson = path_1.join(ctx.destinationRoot(), "package.json");
        const current = do_devops_1.getPackageJson(pkgJson);
        const updated = Object.assign(Object.assign({}, current), { scripts: Object.assign(Object.assign({}, (current.scripts ? current.scripts : {})), { [scriptName]: command }) });
        console.log(`Updating package.json to set script "${scriptName}"`);
        ctx.fs.writeJSON(pkgJson, updated);
    };
    _buildScript = bs;
    return bs;
};
