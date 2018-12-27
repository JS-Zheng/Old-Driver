const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const pkgJson = require("../package.json");

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      APP_VERSION: JSON.stringify(pkgJson.version),
      APP_NAME: JSON.stringify(pkgJson.name)
    })
  ],
});