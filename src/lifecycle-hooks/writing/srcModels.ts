import { Generator, copyDirectory, copyFile, destinationExists } from "../../private";

export async function srcModels(ctx: Generator, firstTime: boolean) {
  if (firstTime) {
    await copyDirectory(ctx, "src/models");
  }

  if (!destinationExists(ctx, "src/shared")) {
    copyFile(ctx, "src/shared/README.md");
  }
}
