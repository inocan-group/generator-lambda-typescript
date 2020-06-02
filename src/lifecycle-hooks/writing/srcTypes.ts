import { Generator, copyDirectory } from "../../private";

export async function srcTypes(ctx: Generator, firstTime: boolean) {
  if (firstTime) {
    await copyDirectory(ctx, "src/@types");
  }
}
