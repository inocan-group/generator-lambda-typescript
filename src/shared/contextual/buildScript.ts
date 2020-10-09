import { getPackageJson } from "do-devops";
import { join } from "path";
import { GeneratorError } from "../../errors";
import { Generator } from "../../private";

let _buildScript: IBuildScript;

export interface IBuildScript {
  (scriptName: string, command: string): void;
}

/**
 * Adds/updates the build scripts in `package.json` to include this command. If there's
 * a conflict then the user is asked before changing.
 *
 * @param scriptName the name in `package.json`'s "scripts" section
 * @param command the command to run when this script is called by yarn/npm
 */
export const buildScript: IBuildScript = (scriptName, command) => {
  if (!_buildScript) {
    throw new GeneratorError(
      `Attemp to add a script name to package.json with buildScript() prior to it being initialized!`,
      "not-ready"
    );
  }

  return _buildScript(scriptName, command);
};

export const buildScriptConfigurator = (ctx: Generator) => {
  const bs: IBuildScript = (scriptName, command) => {
    const pkgJson = join(ctx.destinationRoot(), "package.json");
    const current = getPackageJson(pkgJson);
    const updated = {
      ...current,
      scripts: {
        ...(current.scripts ? current.scripts : {}),
        [scriptName]: command,
      },
    };
    console.log(`Updating package.json to set script "${scriptName}"`);

    ctx.fs.writeJSON(pkgJson, updated);
  };

  _buildScript = bs;
  return bs;
};
