import { Generator } from "../private";

/**
 * Checks whether a file or directory exists in the destination
 *
 * @param ctx the generator instance
 * @param path the path in the destination you want to check for existance
 */
export function destinationExists(ctx: Generator, path: string) {
  return ctx.fs.exists(ctx.destinationPath(path));
}
