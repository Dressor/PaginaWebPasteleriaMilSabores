import '@testing-library/jasmine-dom'; // <- agrega toBeInTheDocument, etc.


// Opcional: silenciar warnings de React Router en tests
const originalWarn = console.warn;
console.warn = (...args) => {
  if (
    typeof args[0] === 'string' &&
    args[0].includes('React Router Future Flag Warning')
  ) {
    return;
  }
  originalWarn(...args);
};
