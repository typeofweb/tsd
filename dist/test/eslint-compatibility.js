"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const ava_1 = __importDefault(require("ava"));
const execa_1 = __importDefault(require("execa"));
ava_1.default('`expectType` is compatible with eslint @typescript-eslint/no-unsafe-call rule', t => {
    try {
        execa_1.default.sync('node_modules/.bin/eslint', ['source/test/fixtures/eslint-compatibility', '--no-ignore'], {
            cwd: path_1.default.join(__dirname, '../../')
        });
        t.fail('eslint should have found an error!');
    }
    catch (error) {
        if (!error) {
            t.fail('Thrown error is falsy!');
        }
        const execaError = error;
        const outLines = execaError.stdout.trim().split('\n');
        t.regex(outLines[0], /fixtures[/\\]eslint-compatibility[/\\]index.test-d.ts$/, 'Lint error found in unexpected file');
        t.is(outLines[1], '  9:1  error  Unsafe call of an `any` typed value  @typescript-eslint/no-unsafe-call');
        t.is(outLines[3], '✖ 1 problem (1 error, 0 warnings)');
    }
});
