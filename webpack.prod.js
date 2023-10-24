const { merge } = require('webpack-merge');
const comConfig = require('./webpack.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = merge(comConfig, {
  optimization: { splitChunks: {
    // 选择对哪些文件进行拆分，默认是async，即只对动态导入的文件进行拆分
    chunks: 'all',
    // 提取chunk的最小体积
    minSize: 20000,
    // 要提取的chunk最少被引用次数
    minChunks: 1,
    // 对要提取的trunk进行分组
    cacheGroups: {
      // 匹配node_modules中的三方库，将其打包成一个trunk
      defaultVendors: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        priority: -10
      },
      default: {
        // 将至少被两个trunk引入的模块提取出来打包成单独trunk
        minChunks: 2,
        name: 'default',
        priority: -20
      }
    }
  } },
  module: { rules: [
    {
      test: /\.(css|scss)$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader',
        'sass-loader'
      ]
    }
  ] },
  plugins: [new MiniCssExtractPlugin()]
});