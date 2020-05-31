import { Generator, copyDirectory } from "../../private";

export async function srcHandlers(ctx: Generator, firstTime: boolean) {
  if (firstTime) {
    await copyDirectory(ctx, "src/handlers");
  }
}
