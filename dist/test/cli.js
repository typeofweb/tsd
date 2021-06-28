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
const path_1 = __importDefault(require("path"));
const ava_1 = __importDefault(require("ava"));
const execa_1 = __importDefault(require("execa"));
ava_1.default('fail if errors are found', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const { exitCode, stderr } = yield t.throwsAsync(execa_1.default('../../../cli.js', {
        cwd: path_1.default.join(__dirname, 'fixtures/failure')
    }));
    t.is(exitCode, 1);
    t.regex(stderr, /5:19[ ]{2}Argument of type number is not assignable to parameter of type string./);
}));
ava_1.default('succeed if no errors are found', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const { exitCode } = yield execa_1.default('../../../cli.js', {
        cwd: path_1.default.join(__dirname, 'fixtures/success')
    });
    t.is(exitCode, 0);
}));
ava_1.default('provide a path', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const file = path_1.default.join(__dirname, 'fixtures/failure');
    const { exitCode, stderr } = yield t.throwsAsync(execa_1.default('dist/cli.js', [file]));
    t.is(exitCode, 1);
    t.regex(stderr, /5:19[ ]{2}Argument of type number is not assignable to parameter of type string./);
}));
