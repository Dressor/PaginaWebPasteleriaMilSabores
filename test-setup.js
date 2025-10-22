// test-setup.js
/* eslint-disable no-undef */
(function () {
  const g = typeof globalThis !== 'undefined' ? globalThis
        : typeof window !== 'undefined' ? window
        : typeof global !== 'undefined' ? global
        : this;

  // Alias Jest -> Jasmine
  if (typeof g.it === 'function' && typeof g.test !== 'function') {
    g.test = g.it;
  }
  if (typeof g.xit === 'function' && typeof g.xtest !== 'function') {
    g.xtest = g.xit;
  }
})();
