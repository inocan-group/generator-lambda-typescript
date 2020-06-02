import { Generator, copyDirectory, copyFile, destinationExists } from "../../private";

export async function srcShared(ctx: Generator, firstTime: boolean) {
  if (firstTime) {
    await copyDirectory(ctx, "src/shared");
  }

  if (!destinationExists(ctx, "src/shared")) {
    copyFile(ctx, "src/shared/README.md");
  }
}
