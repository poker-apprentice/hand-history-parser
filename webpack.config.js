const path = require('path');
const nodeExternals = require('webpack-node-externals');

const env = process.env.NODE_ENV ?? 'development';
const isProd = env === 'production';

module.exports = {
  mode: env,
  target: 'node',
  devtool: isProd ? 'source-map' : 'inline-source-map',
  entry: {
    index: './src/index.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '~': path.resolve(__dirname, 'src/'),
    },
  },
  // don't compile node_modules
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader'],
      },
    ],
  },
};
