import { IDictionary } from "common-types";
import { join } from "path";
import { writeFileSync } from "fs";

export function setTransientState(state: IDictionary) {
  const filepath = join(process.cwd(), ".yo-transient.json");
  writeFileSync(filepath, JSON.stringify(state), "utf-8");
}
