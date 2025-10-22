// webpack.test.js
const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',           // <- respetará tu .babelrc
          options: {
            // Opcional: si tu .babelrc no se leyera, descomenta lo de abajo:
            // presets: [
            //   ['@babel/preset-env', { targets: { chrome: '100' }, useBuiltIns: 'usage', corejs: 3 }],
            //   ['@babel/preset-react', { runtime: 'automatic' }]
            // ]
          }
        }
      },
      { test: /\.css$/i, use: ['style-loader', 'css-loader'] },
      { test: /\.(png|jpe?g|gif|svg)$/i, type: 'asset/resource' }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: { '@': path.resolve(__dirname, 'src') } // soporta imports como '@/context/auth'
  }
};
