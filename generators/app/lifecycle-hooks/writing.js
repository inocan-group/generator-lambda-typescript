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
exports.writing = void 0;
const private_1 = require("../private");
const shared_1 = require("../shared");
function writing(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const firstTime = !shared_1.destinationExists(ctx, "src/handlers");
        return Promise.all([
            private_1.rootConfig(ctx),
            // SRC
            private_1.srcHandlers(ctx, firstTime),
            private_1.srcModels(ctx, firstTime),
            private_1.srcShared(ctx, firstTime),
            private_1.srcTypes(ctx, firstTime),
            // SERVERLESS CONFIG
            private_1.serverlessStaticConfig(ctx),
        ]);
    });
}
exports.writing = writing;
