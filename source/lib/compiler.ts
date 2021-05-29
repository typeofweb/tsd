import {
	flattenDiagnosticMessageText,
	createProgram,
	Diagnostic as TSDiagnostic,
	SourceFile
} from '@tsd/typescript';
import {ExpectedError, extractAssertions, parseErrorAssertionToLocation} from './parser';
import {Diagnostic, DiagnosticCode, Context, Location} from './interfaces';
import {handle} from './assertions';

// List of diagnostic codes that should be ignored in general
const ignoredDiagnostics = new Set<number>([
	// Older TS version report 'await expression only allowed within async function
	DiagnosticCode.AwaitExpressionOnlyAllowedWithinAsyncFunction,
	DiagnosticCode.TopLevelAwaitOnlyAllowedWhenModuleESNextOrSystem
]);

// List of diagnostic codes which should be ignored inside `expectError` statements
const expectErrordiagnosticCodesToIgnore = new Set<DiagnosticCode>([
	DiagnosticCode.ArgumentTypeIsNotAssignableToParameterType,
	DiagnosticCode.PropertyDoesNotExistOnType,
	DiagnosticCode.CannotAssignToReadOnlyProperty,
	DiagnosticCode.TypeIsNotAssignableToOtherType,
	DiagnosticCode.TypeDoesNotSatisfyTheConstraint,
	DiagnosticCode.GenericTypeRequiresTypeArguments,
	DiagnosticCode.ExpectedArgumentsButGotOther,
	DiagnosticCode.NoOverloadExpectsCountOfArguments,
	DiagnosticCode.NoOverloadExpectsCountOfTypeArguments,
	DiagnosticCode.NoOverloadMatches,
	DiagnosticCode.PropertyMissingInType1ButRequiredInType2,
	DiagnosticCode.TypeHasNoPropertiesInCommonWith,
	DiagnosticCode.ThisContextOfTypeNotAssignableToMethodOfThisType,
	DiagnosticCode.ValueOfTypeNotCallable,
	DiagnosticCode.ExpressionNotCallable,
	DiagnosticCode.OnlyVoidFunctionIsNewCallable,
	DiagnosticCode.ExpressionNotConstructable,
	DiagnosticCode.NewExpressionTargetLackingConstructSignatureHasAnyType,
	DiagnosticCode.MemberCannotHaveOverrideModifierBecauseItIsNotDeclaredInBaseClass,
	DiagnosticCode.MemberMustHaveOverrideModifier,
]);

type IgnoreDiagnosticResult = 'preserve' | 'ignore' | Location;

/**
 * Check if the provided diagnostic should be ignored.
 *
 * @param diagnostic - The diagnostic to validate.
 * @param expectedErrors - Map of the expected errors.
 * @returns Whether the diagnostic should be `'preserve'`d, `'ignore'`d or, in case that
 * the diagnostic is reported from inside of an `expectError` assertion, the `Location`
 * of the assertion.
 */
const ignoreDiagnostic = (
	diagnostic: TSDiagnostic,
	expectedErrors: Map<Location, ExpectedError>
): IgnoreDiagnosticResult => {
	if (ignoredDiagnostics.has(diagnostic.code)) {
		// Filter out diagnostics which are present in the `ignoredDiagnostics` set
		return 'ignore';
	}

	if (!expectErrordiagnosticCodesToIgnore.has(diagnostic.code)) {
		return 'preserve';
	}

	const diagnosticFileName = (diagnostic.file as SourceFile).fileName;

	for (const [location] of expectedErrors) {
		const start = diagnostic.start as number;

		if (diagnosticFileName === location.fileName && start > location.start && start < location.end) {
			return location;
		}
	}

	return 'preserve';
};

/**
 * Get a list of TypeScript diagnostics within the current context.
 *
 * @param context - The context object.
 * @returns List of diagnostics
 */
export const getDiagnostics = (context: Context): Diagnostic[] => {
	const diagnostics: Diagnostic[] = [];

	const program = createProgram(context.testFiles, context.config.compilerOptions);

	const tsDiagnostics = program
		.getSemanticDiagnostics()
		.concat(program.getSyntacticDiagnostics());

	const assertions = extractAssertions(program);

	diagnostics.push(...handle(program.getTypeChecker(), assertions));

	const expectedErrors = parseErrorAssertionToLocation(assertions);
	const expectedErrorsLocationsWithFoundDiagnostics: Location[] = [];

	for (const diagnostic of tsDiagnostics) {
		if (!diagnostic.file) {
			continue;
		}

		const ignoreDiagnosticResult = ignoreDiagnostic(diagnostic, expectedErrors);

		if (ignoreDiagnosticResult !== 'preserve') {
			if (ignoreDiagnosticResult !== 'ignore') {
				expectedErrorsLocationsWithFoundDiagnostics.push(ignoreDiagnosticResult);
			}

			continue;
		}

		const position = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start as number);

		diagnostics.push({
			fileName: diagnostic.file.fileName,
			message: flattenDiagnosticMessageText(diagnostic.messageText, '\n'),
			severity: 'error',
			line: position.line + 1,
			column: position.character
		});
	}

	for (const errorLocationToRemove of expectedErrorsLocationsWithFoundDiagnostics) {
		expectedErrors.delete(errorLocationToRemove);
	}

	for (const [, diagnostic] of expectedErrors) {
		diagnostics.push({
			...diagnostic,
			message: 'Expected an error, but found none.',
			severity: 'error'
		});
	}

	return diagnostics;
};
