import { Generator, License } from "../../private";

import { format } from "date-fns";
import { IConfig } from "../../@types";
import { UnitTestFramework } from "do-devops";
import { copyFile } from "../../shared";

/**
 * files in the root of the repo; mainly focused on config files
 */
export async function rootConfig(ctx: Generator) {
  const config = ctx.config.getAll() as IConfig;

  /**
   * Once the `package.json` file has been established in the repo then it will be left intact
   * going forward
   */
  if (!ctx.fs.exists("package.json")) {
    ctx.fs.copyTpl(ctx.templatePath("package.json"), ctx.destinationPath("package.json"), {
      ...config,
      docsScript: config.documentation
        ? `"docs": "vitepress docs",\n"docs:build": "vitepress build docs",\n`
        : "",
    });
  }

  const WALLABY =
    config.unitTesting === UnitTestFramework.mocha
      ? "wallaby.mocha.js"
      : config.unitTesting === UnitTestFramework.jest
      ? "wallaby.jest.js"
      : false;

  /**
   * Configuration files to copy
   */
  ["tsconfig.json", "tsconfig-cjs.json", "webpack.config.js", "_gitignore", "do.config.js"].forEach(
    (f) => {
      ctx.fs.copy(ctx.templatePath(f), ctx.destinationPath(returnDot(f)), { dot: true });
    }
  );
  // Wallaby config
  if (WALLABY) ctx.fs.copy(ctx.templatePath(WALLABY), ctx.destinationPath("wallaby.js"));

  if (config.license === License.MIT && !ctx.fs.exists(ctx.destinationPath("LICENSE"))) {
    const year = format(new Date(), "yyyy");
    ctx.fs.copyTpl(ctx.templatePath("LICENSE"), ctx.destinationPath("LICENSE"), { year });
  }

  if (config.license !== License.UNLICENSED) {
    ctx.fs.copy(ctx.templatePath("_travis.yml"), ctx.destinationPath(".travis.yml"));
  }
}

/** converts all underscore characters to dots */
function returnDot(item: string) {
  return item.slice(0, 1) === "_" ? `.${item.slice(1)}` : item;
}
