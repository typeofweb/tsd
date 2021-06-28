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
ava_1.default('assignable', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const diagnostics = yield __1.default({ cwd: path_1.default.join(__dirname, 'fixtures/assignability/assignable') });
    utils_1.verify(t, diagnostics, [
        [8, 26, 'error', 'Argument of type \'string\' is not assignable to parameter of type \'boolean\'.']
    ]);
}));
ava_1.default('not assignable', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const diagnostics = yield __1.default({ cwd: path_1.default.join(__dirname, 'fixtures/assignability/not-assignable') });
    utils_1.verify(t, diagnostics, [
        [4, 0, 'error', 'Argument of type `string` is assignable to parameter of type `string | number`.'],
        [5, 0, 'error', 'Argument of type `string` is assignable to parameter of type `any`.'],
    ]);
}));
