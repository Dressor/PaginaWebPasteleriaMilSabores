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
