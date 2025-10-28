// Guard import of @testing-library/jest-dom so it doesn't break when tests
// run under Jasmine/Karma (jest-dom expects Jest's expect.extend to exist).
try {
	if (typeof expect !== 'undefined' && typeof expect.extend === 'function') {
		// In Jest environment this will attach helpful matchers.
		// eslint-disable-next-line global-require
		require('@testing-library/jest-dom');
	} else if (typeof expect !== 'undefined' && typeof expect.extend !== 'function') {
		// Provide a no-op extend for environments like Jasmine so importing
		// modules that call expect.extend won't throw. This is a minimal shim.
		expect.extend = function() { /* no-op for non-Jest env */ };
	}
} catch (err) {
	// If require/import fails or other issues, ignore — tests can run without jest-dom
}

// ---------------------------------------------------------------------------
// Quiet some noisy warnings that appear during tests
// - React Router "future flags" informational warnings
// - React Testing Library / React's "not wrapped in act" warnings from Suspense
// This keeps test output focused on real failures. If you'd rather see these
// during test runs, remove or adjust the IGNORE_PATTERNS below.
// ---------------------------------------------------------------------------
const IGNORE_PATTERNS = [
	// React Router future flag informational text
	'React Router',
	// React Testing warnings about updates not wrapped in act
	'not wrapped in act',
	'An update to .* inside a test was not wrapped in act',
	// ReactDOM deprecation/info lines (if present in older setups)
	'ReactDOM.render is no longer supported',
	// Suspense related noise
	'Suspense',
];

const _origWarn = console.warn.bind(console);
const _origError = console.error.bind(console);

function _getMessageText(arg) {
	if (!arg) return '';
	if (typeof arg === 'string') return arg;
	if (arg && arg.message) return arg.message;
	try {
		return JSON.stringify(arg);
	} catch (e) {
		return String(arg);
	}
}

function _shouldIgnore(args) {
	if (!args || !args[0]) return false;
	const text = _getMessageText(args[0]);
	return IGNORE_PATTERNS.some((pattern) => {
		try {
			const re = new RegExp(pattern);
			return re.test(text);
		} catch (e) {
			return text.includes(pattern);
		}
	});
}

console.warn = (...args) => {
	if (_shouldIgnore(args)) return;
	_origWarn(...args);
};

console.error = (...args) => {
	if (_shouldIgnore(args)) return;
	_origError(...args);
};
