import { Generator } from "../Generator";
import { IDictionary } from "common-types";
import { join } from "path";
import globby = require("globby");

/**
 * Copies directories/subdirectories from source to destination while injecting variables into
 * the files which have template tags in them.
 *
 * @param ctx an instance of the Generator
 * @param dir the relative directory path which you want to copy
 * @param valueDictionary the dictionary of name/value pairs which will be injected into the docs
 */
export async function copyTplDirectory(ctx: Generator, dir: string, valueDictionary: IDictionary) {
  const fqDir = join(ctx.sourceRoot(), dir);
  const files = (await globby(`${fqDir}/**/*`)).map((f) => f.replace(ctx.sourceRoot(), ""));

  files.forEach((f) =>
    ctx.fs.copyTpl(join(ctx.sourceRoot(), f), join(ctx.destinationPath(), f), valueDictionary)
  );
}
