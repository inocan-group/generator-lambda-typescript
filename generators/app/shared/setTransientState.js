"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setTransientState = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
function setTransientState(state) {
    const filepath = path_1.join(process.cwd(), ".yo-transient.json");
    fs_1.writeFileSync(filepath, JSON.stringify(state), "utf-8");
}
exports.setTransientState = setTransientState;
