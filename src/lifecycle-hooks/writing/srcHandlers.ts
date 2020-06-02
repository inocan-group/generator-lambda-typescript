import { Generator, copyDirectory, copyFile } from "../../private";

export async function srcHandlers(ctx: Generator, firstTime: boolean) {
  if (firstTime) {
    await copyDirectory(ctx, "src/handlers");
  } else {
    copyFile(ctx, "src/handlers/README.md");
  }
}
