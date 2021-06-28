import { ExecutionContext } from 'ava';
import { Diagnostic } from '../../lib/interfaces';
declare type Expectation = [
    line: number,
    column: number,
    severity: 'error' | 'warning',
    message: string
];
declare type ExpectationWithFileName = [
    line: number,
    column: number,
    severity: 'error' | 'warning',
    message: string,
    fileName: string
];
/**
 * Verify a list of diagnostics.
 *
 * @param t - The AVA execution context.
 * @param diagnostics - List of diagnostics to verify.
 * @param expectations - Expected diagnostics.
 */
export declare const verify: (t: ExecutionContext, diagnostics: Diagnostic[], expectations: Expectation[]) => void;
/**
 * Verify a list of diagnostics including file paths.
 *
 * @param t - The AVA execution context.
 * @param cwd - The working directory as passed to `tsd`.
 * @param diagnostics - List of diagnostics to verify.
 * @param expectations - Expected diagnostics.
 */
export declare const verifyWithFileName: (t: ExecutionContext, cwd: string, diagnostics: Diagnostic[], expectations: ExpectationWithFileName[]) => void;
export {};
