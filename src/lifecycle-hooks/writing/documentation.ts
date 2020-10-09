import { IConfig } from "../../@types";
import { Generator, destinationExists } from "../../private";
import { buildScript, copy } from "../../shared";

export async function documentation(ctx: Generator) {
  const config = ctx.config.getAll() as IConfig;
  const hasDocsDir = destinationExists(ctx, "docs");
  if (config.documentation) {
    const dictionary = {
      year: new Date().getFullYear(),
      name: config.serviceName,
      organization: config.repoOrg,
      repo: config.repoUrl,
      ...config,
    };

    if (!hasDocsDir) {
      copy("docs/getting-started/**", { isGlob: true, dictionary });
    }
    buildScript("docs", `yarn ${config.documentation} serve docs`);
    buildScript("docs:build", `yarn ${config.documentation} build docs`);

    switch (config.documentation) {
      case "vitepress":
        await copy("docs/.vitepress/**", { isGlob: true, dictionary });
        if (!hasDocsDir) {
          await copy("docs/index-vitepress.md", {
            dictionary,
            destination: (f) => f.replace("-vitepress", ""),
          });
        }
        ctx.yarnInstall(["vitepress"], { dev: true });
        break;
      case "vuepress":
        await copy("docs/.vuepress/**", { isGlob: true, dictionary: ctx.config });
        if (!hasDocsDir) {
          await copy("docs/index-vuepress.md", {
            dictionary,
            destination: (f) => f.replace("-vuepress", ""),
          });
        }
        ctx.yarnInstall(
          [
            "vuepress",
            "@vuepress/back-to-top",
            "@vuepress/last-updated",
            "@vuepress/medium-zoom",
            "@vuepress/plugin-pwa",
            "vuepress-plugin-mermaidjs",
            "vuepress-plugin-autometa",
          ],
          { dev: true }
        );
        break;

      default:
        console.warn(
          `- The configuration expressed a desire for an unknown documentation system: ${config.documentation}. Ignoring.`
        );
    }
  }
}
