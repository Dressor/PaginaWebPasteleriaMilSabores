// karma.conf.js
module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      // setup (matchers/utilidades, si usas alguno)
      { pattern: 'test-setup.js', watched: false }, 
      // TODOS los tests en src
      { pattern: 'src/**/*.spec.js', watched: false },
      { pattern: 'src/**/*.spec.jsx', watched: false },
      { pattern: 'src/**/__tests__/**/*.js', watched: false },
      { pattern: 'src/**/__tests__/**/*.jsx', watched: false },
    ],
    preprocessors: {
      'test-setup.js': ['webpack', 'sourcemap'],
      'src/**/*.spec.js': ['webpack', 'sourcemap'],
      'src/**/*.spec.jsx': ['webpack', 'sourcemap'],
      'src/**/__tests__/**/*.js': ['webpack', 'sourcemap'],
      'src/**/__tests__/**/*.jsx': ['webpack', 'sourcemap'],
    },
    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      module: {
        rules: [
          { test: /\.(js|jsx)$/, exclude: /node_modules/, use: { loader: 'babel-loader' } },
          { test: /\.css$/, use: ['style-loader', 'css-loader'] },
          { test: /\.(png|jpe?g|gif|svg)$/i, type: 'asset/resource' },
        ]
      },
      resolve: { extensions: ['.js', '.jsx'] }
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: 'coverage',
      reporters: [{ type: 'html' }, { type: 'text-summary' }]
    },
    browsers: ['ChromeHeadless'],
    singleRun: true
  });
};
