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
const utils_1 = require("./fixtures/utils");
const __1 = __importDefault(require(".."));
ava_1.default('deprecated', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const diagnostics = yield __1.default({ cwd: path_1.default.join(__dirname, 'fixtures/deprecated/expect-deprecated') });
    utils_1.verify(t, diagnostics, [
        [6, 0, 'error', 'Expected `(foo: number, bar: number): number` to be marked as `@deprecated`'],
        [15, 0, 'error', 'Expected `Options.delimiter` to be marked as `@deprecated`'],
        [19, 0, 'error', 'Expected `Unicorn.RAINBOW` to be marked as `@deprecated`'],
        [34, 0, 'error', 'Expected `RainbowClass` to be marked as `@deprecated`']
    ]);
}));
ava_1.default('not deprecated', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const diagnostics = yield __1.default({ cwd: path_1.default.join(__dirname, 'fixtures/deprecated/expect-not-deprecated') });
    utils_1.verify(t, diagnostics, [
        [5, 0, 'error', 'Expected `(foo: string, bar: string): string` to not be marked as `@deprecated`'],
        [14, 0, 'error', 'Expected `Options.separator` to not be marked as `@deprecated`'],
        [18, 0, 'error', 'Expected `Unicorn.UNICORN` to not be marked as `@deprecated`'],
        [33, 0, 'error', 'Expected `UnicornClass` to not be marked as `@deprecated`']
    ]);
}));
