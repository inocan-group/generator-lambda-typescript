import { Generator } from "../private";
import { IDictionary } from "common-types";
import { join } from "path";
import globby = require("globby");

/**
 * Copies a file from source to destination; files should be specified with
 * path from root.
 *
 * @param ctx an instance of the Generator
 * @param file the filename (and any path needed to get there)
 */
export async function copyFile(ctx: Generator, file: string, options: IDictionary = {}) {
  const source = join(ctx.sourceRoot(), file);
  const destination = join(ctx.destinationRoot(), file);
  ctx.fs.copy(source, destination, options);
}
