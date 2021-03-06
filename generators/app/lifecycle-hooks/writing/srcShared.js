"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.srcShared = void 0;
const private_1 = require("../../private");
function srcShared(ctx, firstTime) {
    return __awaiter(this, void 0, void 0, function* () {
        if (firstTime) {
            yield private_1.copyDirectory(ctx, "src/shared");
        }
        if (!private_1.destinationExists(ctx, "src/shared")) {
            private_1.copyFile(ctx, "src/shared/README.md");
        }
    });
}
exports.srcShared = srcShared;
