"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Generator = void 0;
const private_1 = require("./private");
const yeoman_generator_1 = require("yeoman-generator");
const chalk_1 = require("chalk");
class Generator extends yeoman_generator_1.default {
    constructor(args, opts) {
        super(args, opts);
    }
    initializing() {
        console.log(private_1.computerText);
        console.log(chalk_1.default `\nStarting the {green Lambda Typescript} generator. {italic For AWS functions with attitude!}\n`);
    }
    install() {
        private_1.install(this);
    }
}
exports.Generator = Generator;
