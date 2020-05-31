import { Generator, copyDirectory } from "../../private";

export async function srcShared(ctx: Generator, firstTime: boolean) {
  if (firstTime) {
    await copyDirectory(ctx, "src/shared");
  }
}
