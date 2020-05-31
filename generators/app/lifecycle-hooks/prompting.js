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
exports.prompting = void 0;
const private_1 = require("../private");
const questions_1 = require("../questions");
function prompting(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const config = ctx.config.getAll();
        const answers = yield ctx.prompt([
            ...private_1.askForNameAndDescription(Object.assign(Object.assign({}, config), { guessedName: ctx.determineAppname() })),
            ...private_1.askAboutTesting(config),
            private_1.askAboutDatabase(config),
            private_1.askAboutLicense(config),
            ...private_1.askAboutRepo(config),
            ...questions_1.askAboutAws(config),
        ]);
        Object.keys(answers)
            .filter((k) => k.slice(0, 1) != "_")
            .forEach((key) => ctx.config.set(key, answers[key]));
        ctx.config.save();
        const transient = private_1.getTransientState();
        Object.keys(answers)
            .filter((k) => k.slice(0, 1) === "_")
            .forEach((key) => (transient[key] = answers[key]));
        private_1.setTransientState(transient);
    });
}
exports.prompting = prompting;
