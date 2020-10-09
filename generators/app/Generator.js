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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Generator = void 0;
const yeoman_generator_1 = __importDefault(require("yeoman-generator"));
const chalk_1 = __importDefault(require("chalk"));
const private_1 = require("./private");
const shared_1 = require("./shared");
class Generator extends yeoman_generator_1.default {
    constructor(args, opts) {
        super(args, opts);
        shared_1.copyConfigurator(this);
        shared_1.buildScriptConfigurator(this);
    }
    initializing() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(private_1.computerText);
            console.log(chalk_1.default `\nStarting the {green Lambda Typescript} generator. {italic AWS functions with attitude!}\n`);
        });
    }
    prompting() {
        return __awaiter(this, void 0, void 0, function* () {
            yield private_1.prompting(this);
        });
    }
    writing() {
        return __awaiter(this, void 0, void 0, function* () {
            yield private_1.writing(this);
        });
    }
    install() {
        return __awaiter(this, void 0, void 0, function* () {
            yield private_1.install(this);
        });
    }
    end() {
        return __awaiter(this, void 0, void 0, function* () {
            yield private_1.closure(this);
        });
    }
}
exports.Generator = Generator;
