import { existsSync, readFileSync } from "fs";

import { IDictionary } from "common-types";
import { join } from "path";

export function getTransientState(): IDictionary {
  const filepath = join(process.cwd(), ".yo-transient.json");
  if (!existsSync(filepath)) {
    return {};
  }

  return JSON.parse(readFileSync(filepath, "utf-8"));
}
