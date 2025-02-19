/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack')
const common = require('./webpack.config')
const { merge } = require('webpack-merge')

const os = require('os')

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
console.log('process.env.port: ', process.env.port)
module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    contentBase: 'public',
    port: process.env.port,
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
