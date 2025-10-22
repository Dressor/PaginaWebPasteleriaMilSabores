// karma.conf.js
const webpackConfig = require('./webpack.test');

module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      { pattern: 'test-setup.js', watched: false },
      { pattern: 'src/**/*.(test|spec).@(js|jsx)', watched: false },
      { pattern: 'src/**/__tests__/**/*.@(js|jsx)', watched: false }
    ],
    preprocessors: {
      'test-setup.js': ['webpack', 'sourcemap'],
      'src/**/*.(test|spec).@(js|jsx)': ['webpack', 'sourcemap'],
      'src/**/__tests__/**/*.@(js|jsx)': ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,
    webpackMiddleware: { stats: 'errors-only' },

    reporters: ['progress'],
    browsers: ['ChromeHeadless'],
    singleRun: false,
    autoWatch: true,
    client: {
      jasmine: { random: false, timeoutInterval: 10000 },
      clearContext: false
    }
  });
};
