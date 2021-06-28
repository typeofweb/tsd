"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyWithFileName = exports.verify = void 0;
const path_1 = __importDefault(require("path"));
/**
 * Verify a list of diagnostics.
 *
 * @param t - The AVA execution context.
 * @param diagnostics - List of diagnostics to verify.
 * @param expectations - Expected diagnostics.
 */
const verify = (t, diagnostics, expectations) => {
    const diagnosticObjs = diagnostics.map(({ line, column, severity, message }) => ({
        line,
        column,
        severity,
        message,
    }));
    const expectationObjs = expectations.map(([line, column, severity, message]) => ({
        line,
        column,
        severity,
        message,
    }));
    t.deepEqual(diagnosticObjs, expectationObjs, 'Received diagnostics that are different from expectations!');
};
exports.verify = verify;
/**
 * Verify a list of diagnostics including file paths.
 *
 * @param t - The AVA execution context.
 * @param cwd - The working directory as passed to `tsd`.
 * @param diagnostics - List of diagnostics to verify.
 * @param expectations - Expected diagnostics.
 */
const verifyWithFileName = (t, cwd, diagnostics, expectations) => {
    const diagnosticObjs = diagnostics.map(({ line, column, severity, message, fileName }) => ({
        line,
        column,
        severity,
        message,
        fileName: path_1.default.relative(cwd, fileName),
    }));
    const expectationObjs = expectations.map(([line, column, severity, message, fileName]) => ({
        line,
        column,
        severity,
        message,
        fileName,
    }));
    t.deepEqual(diagnosticObjs, expectationObjs, 'Received diagnostics that are different from expectations!');
};
exports.verifyWithFileName = verifyWithFileName;
