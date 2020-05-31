import { Generator, License } from "../../private";

import { format } from "date-fns";

/** files in the root of the repo; mainly focused on config of this or that */
export async function rootConfig(ctx: Generator) {
  const config = ctx.config.getAll();
  console.log({ config });

  if (!ctx.fs.exists("package.json")) {
    ctx.fs.copyTpl(ctx.templatePath("package.json"), ctx.destinationPath("package.json"), config);
  }

  ["tsconfig.json", "tsconfig-cjs.json", "wallaby.js", "webpack.config.js", ".gitignore"].forEach((f) => {
    ctx.fs.copy(ctx.templatePath(f), ctx.destinationPath(f));
  });

  if (config.license === License.MIT && !ctx.fs.exists(ctx.destinationPath("LICENSE"))) {
    const year = format(new Date(), "yyyy");
    ctx.fs.copyTpl(ctx.templatePath("LICENSE"), ctx.destinationPath("LICENSE"), { year });
  }
}
