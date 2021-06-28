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
ava_1.default('identical', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const diagnostics = yield __1.default({ cwd: path_1.default.join(__dirname, 'fixtures/identicality/identical') });
    utils_1.verify(t, diagnostics, [
        [7, 0, 'error', 'Parameter type `any` is not identical to argument type `number`.'],
        [8, 0, 'error', 'Parameter type `string | number` is declared too wide for argument type `string`.'],
        [10, 0, 'error', 'Parameter type `false` is not identical to argument type `any`.'],
        [12, 0, 'error', 'Parameter type `string` is declared too wide for argument type `never`.'],
        [13, 0, 'error', 'Parameter type `any` is declared too wide for argument type `never`.'],
    ]);
}));
ava_1.default('not identical', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const diagnostics = yield __1.default({ cwd: path_1.default.join(__dirname, 'fixtures/identicality/not-identical') });
    utils_1.verify(t, diagnostics, [
        [7, 0, 'error', 'Parameter type `string` is identical to argument type `string`.'],
        [10, 0, 'error', 'Parameter type `any` is identical to argument type `any`.'],
    ]);
}));
