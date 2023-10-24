const { merge } = require('webpack-merge');
const comConfig = require('./webpack.common');

module.exports = merge(comConfig, {
  cache: { type: 'filesystem' },
  plugins: [
  ]
});