const { merge } = require('webpack-merge');
const configCommon = require('./webpack.config.common.js');

process.env.NODE_ENV = 'development';

const development = {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    port: 12306,
    open: true,
    hot: true  // 热部署
  }
}


module.exports = merge(configCommon, development);