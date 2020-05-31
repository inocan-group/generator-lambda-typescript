import { Generator, rootConfig, serverlessStaticConfig, srcHandlers, srcModels, srcShared } from "../private";

import { existsSync } from "fs";
import { join } from "path";

export async function writing(ctx: Generator) {
  const firstTime = !existsSync(join(process.cwd(), "src/handlers"));
  return Promise.all([
    rootConfig(ctx),
    // SRC
    srcHandlers(ctx, firstTime),
    srcModels(ctx, firstTime),
    srcShared(ctx, firstTime),
    // SERVERLESS CONFIG
    serverlessStaticConfig(ctx),
  ]);
}
