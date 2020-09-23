import { IConfig } from "../../@types";
import { Generator, copyTplDirectory, destinationExists } from "../../private";

export async function documentation(ctx: Generator) {
  const config = ctx.config.getAll() as IConfig;
  const hasDocsDir = destinationExists(ctx, "docs");
  if (!hasDocsDir && config.documentation) {
    const dictionary = {
      year: new Date().getFullYear(),
      name: config.serviceName,
      organization: config.repoOrg,
      repo: config.repoUrl,
    };
    copyTplDirectory(ctx, "docs/.vitepress", dictionary);
    copyTplDirectory(ctx, "docs", dictionary);
  }
}
