const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './client/index.js',
  target: 'web', //"electron-renderer",
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        // test: /.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: [
            '@babel/plugin-transform-runtime',
            '@babel/transform-async-to-generator',
          ],
        },
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          // Needed package for resolving relative paths in url()
          // needs to be before sass-loader in loading chain
          // more info on https://github.com/webpack-contrib/sass-loader#problems-with-url
          'resolve-url-loader',
          'sass-loader',
        ],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    compress: true,
    hot: true,
    port: 8080,
    publicPath: '/build/',
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    mainFields: ['main', 'module', 'browser'],
    // fallback: {
    //   “child_process”: false,
    //   // and also other packages that are not found
    // } 
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
};
