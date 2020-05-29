"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Generator = void 0;
const Base = require("yeoman-generator");
const chalk = require("chalk");
const index_1 = require("./index");
class Generator extends Base {
    constructor(args, opts) {
        super(args, opts);
    }
    initializing() {
        console.log(index_1.computerText);
        console.log(chalk `\nStarting the {green Lambda Typescript} generator. {italic For AWS functions with attitude!}\n`);
    }
    install() {
        index_1.install(this);
    }
}
exports.Generator = Generator;
