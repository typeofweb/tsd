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
ava_1.default('throw if no type definition was found', (t) => __awaiter(void 0, void 0, void 0, function* () {
    yield t.throwsAsync(__1.default({ cwd: path_1.default.join(__dirname, 'fixtures/no-tsd') }), { message: 'The type definition `index.d.ts` does not exist. Create one and try again.' });
}));
ava_1.default('throw if no test is found', (t) => __awaiter(void 0, void 0, void 0, function* () {
    yield t.throwsAsync(__1.default({ cwd: path_1.default.join(__dirname, 'fixtures/no-test') }), { message: 'The test file `index.test-d.ts` or `index.test-d.tsx` does not exist. Create one and try again.' });
}));
ava_1.default('return diagnostics', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const diagnostics = yield __1.default({ cwd: path_1.default.join(__dirname, 'fixtures/failure') });
    utils_1.verify(t, diagnostics, [
        [5, 19, 'error', 'Argument of type \'number\' is not assignable to parameter of type \'string\'.']
    ]);
}));
ava_1.default('return diagnostics from imported files as well', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const cwd = path_1.default.join(__dirname, 'fixtures/failure-nested');
    const diagnostics = yield __1.default({ cwd });
    utils_1.verifyWithFileName(t, cwd, diagnostics, [
        [5, 19, 'error', 'Argument of type \'number\' is not assignable to parameter of type \'string\'.', 'child.test-d.ts'],
        [6, 19, 'error', 'Argument of type \'number\' is not assignable to parameter of type \'string\'.', 'index.test-d.ts'],
    ]);
}));
ava_1.default('fail if typings file is not part of `files` list', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const cwd = path_1.default.join(__dirname, 'fixtures/no-files');
    const diagnostics = yield __1.default({ cwd });
    utils_1.verifyWithFileName(t, cwd, diagnostics, [
        [3, 1, 'error', 'TypeScript type definition `index.d.ts` is not part of the `files` list.', 'package.json'],
    ]);
}));
ava_1.default('allow specifying folders containing typings file in `files` list', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const diagnostics = yield __1.default({ cwd: path_1.default.join(__dirname, 'fixtures/files-folder') });
    utils_1.verify(t, diagnostics, []);
}));
ava_1.default('allow specifying negative gitignore-style patterns in `files` list', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const diagnostics = yield __1.default({ cwd: path_1.default.join(__dirname, 'fixtures/files-gitignore-patterns/negative-pattern') });
    utils_1.verify(t, diagnostics, [
        [3, 1, 'error', 'TypeScript type definition `index.d.ts` is not part of the `files` list.'],
    ]);
}));
ava_1.default('allow specifying negated negative (positive) gitignore-style patterns in `files` list', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const diagnostics = yield __1.default({ cwd: path_1.default.join(__dirname, 'fixtures/files-gitignore-patterns/negative-pattern-negated') });
    utils_1.verify(t, diagnostics, []);
}));
ava_1.default('allow specifying root marker (/) gitignore-style patterns in `files` list', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const diagnostics = yield __1.default({ cwd: path_1.default.join(__dirname, 'fixtures/files-gitignore-patterns/root-marker-pattern') });
    utils_1.verify(t, diagnostics, []);
}));
ava_1.default('allow specifying glob patterns containing typings file in `files` list', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const diagnostics = yield __1.default({ cwd: path_1.default.join(__dirname, 'fixtures/files-glob') });
    utils_1.verify(t, diagnostics, []);
}));
ava_1.default('fail if `typings` property is used instead of `types`', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const cwd = path_1.default.join(__dirname, 'fixtures/types-property/typings');
    const diagnostics = yield __1.default({ cwd });
    utils_1.verifyWithFileName(t, cwd, diagnostics, [
        [3, 1, 'error', 'Use property `types` instead of `typings`.', 'package.json'],
    ]);
}));
ava_1.default('fail if tests don\'t pass in strict mode', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const cwd = path_1.default.join(__dirname, 'fixtures/failure-strict-null-checks');
    const diagnostics = yield __1.default({ cwd });
    utils_1.verifyWithFileName(t, cwd, diagnostics, [
        [
            4,
            19,
            'error',
            'Argument of type \'number | null\' is not assignable to parameter of type \'number\'.\n  Type \'null\' is not assignable to type \'number\'.',
            'index.test-d.ts',
        ],
    ]);
}));
ava_1.default('overridden config defaults to `strict` if `strict` is not explicitly overridden', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const cwd = path_1.default.join(__dirname, 'fixtures/strict-null-checks-as-default-config-value');
    const diagnostics = yield __1.default({ cwd });
    utils_1.verifyWithFileName(t, cwd, diagnostics, [
        [
            4,
            19,
            'error',
            'Argument of type \'number | null\' is not assignable to parameter of type \'number\'.\n  Type \'null\' is not assignable to type \'number\'.',
            'index.test-d.ts',
        ],
    ]);
}));
ava_1.default('fail if types are used from a lib that was not explicitly specified', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const cwd = path_1.default.join(__dirname, 'fixtures/lib-config/failure-missing-lib');
    const diagnostics = yield __1.default({ cwd });
    utils_1.verifyWithFileName(t, cwd, diagnostics, [
        [1, 22, 'error', 'Cannot find name \'Window\'.', 'index.d.ts'],
        [4, 11, 'error', 'Cannot find name \'Window\'.', 'index.test-d.ts'],
    ]);
}));
ava_1.default('allow specifying a lib as a triple-slash-reference', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const diagnostics = yield __1.default({ cwd: path_1.default.join(__dirname, 'fixtures/lib-config/lib-as-triple-slash-reference') });
    utils_1.verify(t, diagnostics, []);
}));
ava_1.default('allow specifying a lib in package.json\'s `tsd` field', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const diagnostics = yield __1.default({ cwd: path_1.default.join(__dirname, 'fixtures/lib-config/lib-from-package-json') });
    utils_1.verify(t, diagnostics, []);
}));
ava_1.default('allow specifying a lib in tsconfig.json', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const diagnostics = yield __1.default({ cwd: path_1.default.join(__dirname, 'fixtures/lib-config/lib-from-tsconfig-json') });
    utils_1.verify(t, diagnostics, []);
}));
ava_1.default('add support for esm with esModuleInterop', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const diagnostics = yield __1.default({
        cwd: path_1.default.join(__dirname, 'fixtures/esm')
    });
    utils_1.verify(t, diagnostics, []);
}));
ava_1.default('add DOM support by default', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const diagnostics = yield __1.default({
        cwd: path_1.default.join(__dirname, 'fixtures/dom')
    });
    utils_1.verify(t, diagnostics, []);
}));
ava_1.default('a lib option in package.json overrdides a lib option in tsconfig.json', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const diagnostics = yield __1.default({ cwd: path_1.default.join(__dirname, 'fixtures/lib-config/lib-from-package-json-overrides-tsconfig-json') });
    utils_1.verify(t, diagnostics, []);
}));
ava_1.default('pass in loose mode when strict mode is disabled in settings', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const diagnostics = yield __1.default({
        cwd: path_1.default.join(__dirname, 'fixtures/non-strict-check-with-config')
    });
    utils_1.verify(t, diagnostics, []);
}));
ava_1.default('return no diagnostics', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const diagnostics = yield __1.default({ cwd: path_1.default.join(__dirname, 'fixtures/success') });
    utils_1.verify(t, diagnostics, []);
}));
ava_1.default('support non-barrel main', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const diagnostics = yield __1.default({ cwd: path_1.default.join(__dirname, 'fixtures/test-non-barrel-main') });
    utils_1.verify(t, diagnostics, []);
}));
ava_1.default('allow omitting `types` property when `main` property is missing but main is a barrel (`index.js`) and .d.ts file matches main', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const diagnostics = yield __1.default({ cwd: path_1.default.join(__dirname, 'fixtures/no-explicit-types-property/without-main') });
    utils_1.verify(t, diagnostics, [
        [6, 0, 'error', 'Expected an error, but found none.']
    ]);
}));
ava_1.default('allow omitting `types` property when `main` property is set to a barrel (`index.js`) and .d.ts file matches main', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const diagnostics = yield __1.default({ cwd: path_1.default.join(__dirname, 'fixtures/no-explicit-types-property/with-main-barrel') });
    utils_1.verify(t, diagnostics, [
        [6, 0, 'error', 'Expected an error, but found none.']
    ]);
}));
ava_1.default('allow omitting `types` property when `main` property is set to non-barrel (`foo.js`) and .d.ts file matches main', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const diagnostics = yield __1.default({ cwd: path_1.default.join(__dirname, 'fixtures/no-explicit-types-property/with-main-other') });
    utils_1.verify(t, diagnostics, [
        [6, 0, 'error', 'Expected an error, but found none.']
    ]);
}));
ava_1.default('support testing in sub-directories', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const diagnostics = yield __1.default({ cwd: path_1.default.join(__dirname, 'fixtures/test-in-subdir') });
    utils_1.verify(t, diagnostics, []);
}));
ava_1.default('support top-level await', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const diagnostics = yield __1.default({ cwd: path_1.default.join(__dirname, 'fixtures/top-level-await') });
    utils_1.verify(t, diagnostics, []);
}));
ava_1.default('support default test directory', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const diagnostics = yield __1.default({ cwd: path_1.default.join(__dirname, 'fixtures/test-directory/default') });
    utils_1.verify(t, diagnostics, []);
}));
ava_1.default('support tsx in subdirectory', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const diagnostics = yield __1.default({ cwd: path_1.default.join(__dirname, 'fixtures/test-directory/tsx') });
    utils_1.verify(t, diagnostics, []);
}));
ava_1.default('support setting a custom test directory', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const diagnostics = yield __1.default({ cwd: path_1.default.join(__dirname, 'fixtures/test-directory/custom') });
    utils_1.verify(t, diagnostics, [
        [4, 0, 'error', 'Expected an error, but found none.']
    ]);
}));
ava_1.default('expectError for classes', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const diagnostics = yield __1.default({ cwd: path_1.default.join(__dirname, 'fixtures/expect-error/classes') });
    utils_1.verify(t, diagnostics, []);
}));
ava_1.default('expectError for functions', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const diagnostics = yield __1.default({ cwd: path_1.default.join(__dirname, 'fixtures/expect-error/functions') });
    utils_1.verify(t, diagnostics, [
        [5, 0, 'error', 'Expected an error, but found none.']
    ]);
}));
ava_1.default('expectError for generics', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const diagnostics = yield __1.default({ cwd: path_1.default.join(__dirname, 'fixtures/expect-error/generics') });
    utils_1.verify(t, diagnostics, []);
}));
ava_1.default('expectError should not ignore syntactical errors', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const diagnostics = yield __1.default({ cwd: path_1.default.join(__dirname, 'fixtures/expect-error/syntax') });
    utils_1.verify(t, diagnostics, [
        [4, 29, 'error', '\')\' expected.'],
        [5, 22, 'error', '\',\' expected.'],
        [4, 0, 'error', 'Expected an error, but found none.'],
        [5, 0, 'error', 'Expected an error, but found none.']
    ]);
}));
ava_1.default('expectError for values', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const diagnostics = yield __1.default({ cwd: path_1.default.join(__dirname, 'fixtures/expect-error/values') });
    utils_1.verify(t, diagnostics, [
        [5, 0, 'error', 'Expected an error, but found none.']
    ]);
}));
ava_1.default('expectError for values (noImplicitAny disabled)', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const diagnostics = yield __1.default({ cwd: path_1.default.join(__dirname, 'fixtures/expect-error/values-disabled-no-implicit-any') });
    utils_1.verify(t, diagnostics, []);
}));
ava_1.default('missing import', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const diagnostics = yield __1.default({ cwd: path_1.default.join(__dirname, 'fixtures/missing-import') });
    utils_1.verify(t, diagnostics, [
        [3, 18, 'error', 'Cannot find name \'Primitive\'.']
    ]);
}));
ava_1.default('tsx component', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const diagnostics = yield __1.default({ cwd: path_1.default.join(__dirname, 'fixtures/tsx/component') });
    utils_1.verify(t, diagnostics, []);
}));
ava_1.default('tsx component type', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const diagnostics = yield __1.default({ cwd: path_1.default.join(__dirname, 'fixtures/tsx/component-type') });
    utils_1.verify(t, diagnostics, []);
}));
ava_1.default('loose types', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const diagnostics = yield __1.default({ cwd: path_1.default.join(__dirname, 'fixtures/strict-types/loose') });
    utils_1.verify(t, diagnostics, [
        [5, 0, 'error', 'Parameter type `string` is declared too wide for argument type `"cat"`.'],
        [7, 0, 'error', 'Parameter type `string | number` is declared too wide for argument type `string`.'],
        [8, 0, 'error', 'Parameter type `string | number` is declared too wide for argument type `number`.'],
        [10, 0, 'error', 'Parameter type `string | Date` is declared too wide for argument type `Date`.'],
        [11, 0, 'error', 'Parameter type `Promise<string | number>` is declared too wide for argument type `Promise<number>`.'],
        [12, 0, 'error', 'Parameter type `string | Promise<string | number>` is declared too wide for argument type `Promise<string | number>`.'],
        [14, 0, 'error', 'Parameter type `Promise<string | number>` is declared too wide for argument type `Promise<number>`.'],
        [16, 0, 'error', 'Parameter type `Observable<string | number>` is declared too wide for argument type `Observable<string>`.'],
        [20, 0, 'error', 'Parameter type `Observable<string | number> | Observable<string | number | boolean>` is declared too wide for argument type `Observable<string | number> | Observable<string>`.'],
        [28, 0, 'error', 'Parameter type `Foo<string | Foo<string | number>> | Foo<Date> | Foo<Symbol>` is declared too wide for argument type `Foo<Date> | Foo<Symbol> | Foo<string | Foo<number>>`.'],
        [32, 0, 'error', 'Parameter type `string | number` is not identical to argument type `any`.'],
        [34, 0, 'error', 'Parameter type `Observable<string | number> | Observable<any> | Observable<string | number | boolean>` is not identical to argument type `Observable<string | number> | Observable<string> | Observable<string | number | boolean>`.']
    ]);
}));
ava_1.default('strict types', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const diagnostics = yield __1.default({ cwd: path_1.default.join(__dirname, 'fixtures/strict-types/strict') });
    utils_1.verify(t, diagnostics, []);
}));
ava_1.default('typings in custom directory', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const diagnostics = yield __1.default({
        cwd: path_1.default.join(__dirname, 'fixtures/typings-custom-dir'),
        typingsFile: 'utils/index.d.ts'
    });
    utils_1.verify(t, diagnostics, [
        [5, 19, 'error', 'Argument of type \'number\' is not assignable to parameter of type \'string\'.']
    ]);
}));
ava_1.default('specify test files manually', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const diagnostics = yield __1.default({
        cwd: path_1.default.join(__dirname, 'fixtures/specify-test-files'),
        testFiles: [
            'unknown.test.ts'
        ]
    });
    utils_1.verify(t, diagnostics, [
        [5, 19, 'error', 'Argument of type \'number\' is not assignable to parameter of type \'string\'.']
    ]);
}));
ava_1.default('fails if typings file is not found in the specified path', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const error = yield t.throwsAsync(__1.default({
        cwd: path_1.default.join(__dirname, 'fixtures/typings-custom-dir'),
        typingsFile: 'unknown.d.ts'
    }));
    t.is(error.message, 'The type definition `unknown.d.ts` does not exist. Create one and try again.');
}));
ava_1.default('includes extended config files along with found ones', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const diagnostics = yield __1.default({ cwd: path_1.default.join(__dirname, 'fixtures/ts-config-extends') });
    utils_1.verify(t, diagnostics, [
        [6, 64, 'error', 'Not all code paths return a value.'],
    ]);
}));
ava_1.default('errors in libs from node_modules are not reported', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const diagnostics = yield __1.default({ cwd: path_1.default.join(__dirname, 'fixtures/exclude-node-modules') });
    const [nodeModuleDiagnostics, testFileDiagnostics, otherDiagnostics] = diagnostics.reduce(([nodeModuleDiags, testFileDiags, otherDiags], diagnostic) => {
        if (/[/\\]node_modules[/\\]/.test(diagnostic.fileName)) {
            nodeModuleDiags.push(diagnostic);
        }
        else if (/[/\\]fixtures[/\\]exclude-node-modules[/\\]/.test(diagnostic.fileName)) {
            testFileDiags.push(diagnostic);
        }
        else {
            otherDiags.push(diagnostic);
        }
        return [nodeModuleDiags, testFileDiags, otherDiags];
    }, [[], [], []]);
    t.deepEqual(nodeModuleDiagnostics.length, 0, 'There must be no errors from node_modules folders when standard lib is not available (option `"noLib": true`).');
    t.true(otherDiagnostics.length > 0, 'There must be errors from tsd lib when standard lib is not available (option `"noLib": true`).');
    const alloweOtherFileFailures = [
        /[/\\]lib[/\\]index.d.ts$/,
        /[/\\]lib[/\\]interfaces.d.ts$/,
    ];
    otherDiagnostics.forEach(diagnostic => {
        t.true(alloweOtherFileFailures.some(allowedFileRe => allowedFileRe.test(diagnostic.fileName)), `Found diagnostic from an unexpected file: ${diagnostic.fileName} - ${diagnostic.message}`);
    });
    utils_1.verify(t, testFileDiagnostics, [
        [3, 18, 'error', 'Cannot find name \'Bar\'.']
    ]);
}));
ava_1.default('allow specifying `rootDir` option in `tsconfig.json`', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const diagnostics = yield __1.default({ cwd: path_1.default.join(__dirname, 'fixtures/root-dir') });
    utils_1.verify(t, diagnostics, []);
}));
ava_1.default('prints the types of expressions passed to `printType` helper', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const diagnostics = yield __1.default({ cwd: path_1.default.join(__dirname, 'fixtures/print-type') });
    utils_1.verify(t, diagnostics, [
        [4, 0, 'warning', 'Type for expression `aboveZero` is: `(foo: number) => number | null`'],
        [5, 0, 'warning', 'Type for expression `null` is: `null`'],
        [6, 0, 'warning', 'Type for expression `undefined` is: `undefined`'],
        [7, 0, 'warning', 'Type for expression `null as any` is: `any`'],
        [8, 0, 'warning', 'Type for expression `null as never` is: `never`'],
        [9, 0, 'warning', 'Type for expression `null as unknown` is: `unknown`'],
        [10, 0, 'warning', 'Type for expression `\'foo\'` is: `"foo"`'],
    ]);
}));
