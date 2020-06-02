import { Generator, rootConfig, serverlessStaticConfig, srcHandlers, srcModels, srcShared, srcTypes } from "../private";

import { destinationExists } from "../shared";

export async function writing(ctx: Generator) {
  const firstTime = !destinationExists(ctx, "src/handlers");
  return Promise.all([
    rootConfig(ctx),
    // SRC
    srcHandlers(ctx, firstTime),
    srcModels(ctx, firstTime),
    srcShared(ctx, firstTime),
    srcTypes(ctx, firstTime),
    // SERVERLESS CONFIG
    serverlessStaticConfig(ctx),
  ]);
}
