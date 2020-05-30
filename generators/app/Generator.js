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
exports.Generator = void 0;
const YeomanGenerator = require("yeoman-generator");
const chalk = require("chalk");
const private_1 = require("./private");
class Generator extends YeomanGenerator {
    constructor(args, opts) {
        super(args, opts);
    }
    initializing() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(private_1.computerText);
            console.log(chalk `\nStarting the {green Lambda Typescript} generator. {italic For AWS functions with attitude!}\n`);
            const answers = yield this.prompt([
                private_1.askForProjectName(this.config.getAll()),
                ...private_1.askAboutTesting(this.config.getAll()),
            ]);
            Object.keys(answers).forEach((key) => this.config.set(key, answers[key]));
            this.config.save();
        });
    }
    install() {
        private_1.install(this);
    }
}
exports.Generator = Generator;
