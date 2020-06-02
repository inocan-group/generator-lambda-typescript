"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransientState = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
function getTransientState() {
    const filepath = path_1.join(process.cwd(), ".yo-transient.json");
    if (!fs_1.existsSync(filepath)) {
        return {};
    }
    return JSON.parse(fs_1.readFileSync(filepath, "utf-8"));
}
exports.getTransientState = getTransientState;
