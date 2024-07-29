/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack')
const common = require('./webpack.config')
const { merge } = require('webpack-merge')
const path = require('path')
const os = require('os')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 获取当前 IP 地址
function getLocalIpAddress() {
  const interfaces = os.networkInterfaces()
  for (const interfaceName of Object.keys(interfaces)) {
    const interface = interfaces[interfaceName]
    for (const info of interface) {
      if (!info.internal && info.family === 'IPv4') {
        return info.address
      }
    }
  }
  return 'localhost' // 如果无法获取 IP 地址，则使用 localhost
}

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: '[name].[contenthash:8].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    clean: true,
    publicPath: '/',
    assetModuleFilename: 'asset/[hash:10][ext][query]'
  },
  devtool: 'source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      publicPath: '/'
    })
  ],
  devServer: {
    contentBase: 'public',
    port: 9009,
    open: true,
    hot: true,
    historyApiFallback: true,
    host: getLocalIpAddress()
    // https: {
    //     key: fs.readFileSync(path.resolve(__dirname, '../.cert/key.pem')),
    //     cert: fs.readFileSync(path.resolve(__dirname, '../.cert/cert.pem'))
    // }
  }
})
