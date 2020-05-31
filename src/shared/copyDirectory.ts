import { Generator } from "../private";
import { join } from "path";
import globby = require("globby");

/**
 * Copies directories/subdirectories from source to destination
 *
 * @param ctx an instance of the Generator
 * @param dir the relative directory path which you want to copy
 */
export async function copyDirectory(ctx: Generator, dir: string) {
  const fqDir = join(ctx.sourceRoot(), dir);
  const files = await (await globby(`${fqDir}/**/*`)).map((f) => f.replace(ctx.sourceRoot(), ""));

  files.forEach((f) => ctx.fs.copy(join(ctx.sourceRoot(), f), join(ctx.destinationPath(), f)));
}
