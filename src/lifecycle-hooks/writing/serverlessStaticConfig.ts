import { Generator, copyDirectory } from "../../private";

export async function serverlessStaticConfig(ctx: Generator) {
  await copyDirectory(ctx, "serverless-config");

  // ["build.ts", "config.ts", "env.yml", "README.md"].forEach((f) => {
  //   ctx.fs.copy(`serverless-config/${f}`, `serverless-config/${f}`);
  // });
}
