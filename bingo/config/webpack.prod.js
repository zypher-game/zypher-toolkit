/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require('webpack-merge')
const common = require('./webpack.config')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const path = require('path')

// const glob = require('glob')
// const PurgeCSSPlugin = require('purgecss-webpack-plugin')
module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name].[contenthash:8].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    clean: true,
    publicPath: '/bingo/',
    assetModuleFilename: 'asset/[hash:10][ext][query]'
  },
  optimization: {
    minimize: true,
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      // `...`,
      new TerserPlugin(),
      new CssMinimizerPlugin()
    ],
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: false,
        default: false
      }
    }
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: './public/index.html',
    //   publicPath: '/bingo/'
    // })
    // new PurgeCSSPlugin({
    //     paths: glob.sync(path.resolve(__dirname, 'src/**/*'), { nodir: true })
    // }),
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, '../public/img'),
    //       to: path.resolve(__dirname, '../dist/img')
    //     },
    //     {
    //       from: path.resolve(__dirname, '../public/audio'),
    //       to: path.resolve(__dirname, '../dist/audio')
    //     }
    //   ]
    // })
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, '../public/lib'),
    //       to: path.resolve(__dirname, '../dist/lib')
    //     }
    //   ]
    // })
  ]
})
