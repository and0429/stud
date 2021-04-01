const { merge } = require('webpack-merge');

const configCommon = require('./webpack.config.common.js');

process.env.NODE_ENV = 'production';

const production = {
  mode: 'production',
  devtool: 'hidden-source-map',
}

module.exports = merge(configCommon, production);
