const path = require('path');
const rules = require('./loader-rules');

module.exports = {
  entry: ['./src/index.js'],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../dist'),
  },
  module: {
    rules
  },
}