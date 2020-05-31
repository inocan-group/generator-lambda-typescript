import { Generator, copyDirectory } from "../../private";

export async function srcModels(ctx: Generator, firstTime: boolean) {
  if (firstTime) {
    await copyDirectory(ctx, "src/models");
  }
}
