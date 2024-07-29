/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const WebpackBar = require('webpackbar')
const { cssLoader } = require('./utils/cssLoader')
const { VanillaExtractPlugin } = require('@vanilla-extract/webpack-plugin')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const preLink = process.env.NODE_ENV === 'development' ? 'https://static-dev.zypher.game' : 'https://static.zypher.game'
module.exports = {
  entry: {
    main: './src/index'
  },
  output: {
    publicPath: '/',
    filename: '[name].[contenthash:8].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    clean: true,
    assetModuleFilename: 'asset/[hash:10][ext][query]'
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    ethers: 'ethers'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.REACT_APP_ENVIRONMENT': JSON.stringify(process.env.REACT_APP_ENVIRONMENT || 'development')
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$|^\.\/lib\/chart\/(.)*/,
      contextRegExp: /moment$|echarts$/
    }),
    new WebpackBar(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      preLink: preLink,
      env: process.env.NODE_ENV || 'development'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].bundle.css',
      chunkFilename: '[id].[contenthash:8].chunk.css',
      ignoreOrder: false // Enable to remove warnings about conflicting order
    }),
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'react',
          entry: {
            path: preLink + '/lib/react/react-v18.0.0.production.min.js',
            type: 'js'
          },
          global: 'React'
        },
        {
          module: 'react-dom',
          entry: {
            path: preLink + '/lib/react-dom/react-dom-v18.0.0.production.min.js',
            type: 'js'
          },
          global: 'ReactDOM'
        },
        {
          module: 'crypto',
          entry: {
            path: 'https://static.zypher.game/lib/crypto/crypto-browserify/3.12.0/crypto-browserify.js',
            type: 'js'
          },
          global: 'crypto'
        },
        {
          module: 'ethers',
          entry: {
            path: 'https://static.zypher.game/lib/ethers/5.7.2/ethers.umd.min.js',
            type: 'js'
          },
          global: 'ethers'
        }
      ]
    }),
    new VanillaExtractPlugin({
      identifiers: 'debug'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(pdf|docx|doc|xlsx|mp4)$/,
        use: ['file-loader']
      },
      {
        test: /\.(ts|tsx|js|jsx)?$/,
        exclude: /node_modules\/(?!@zypher-game\/toolkit\/ui\/)/,
        include: [path.resolve(__dirname, '../../ui/src/'), path.resolve(__dirname, '../src/')],
        use: {
          loader: 'babel-loader',
          options: {
            configFile: './.babelrc'
          }
        }
      },
      ...cssLoader(),
      ...cssLoader('less', {
        lessOptions: {
          javascriptEnabled: true
        }
      }),
      ...cssLoader('stylus', {
        webpackImporter: false,
        stylusOptions: {
          import: [path.resolve(__dirname, '../src/assets/stylus/lib/mixin.styl'), path.resolve(__dirname, '../src/assets/stylus/lib/env.styl')]
        }
      }),

      {
        test: /\.(gif|png|jpe?g|webp|svg|ico)$/i,
        include: [path.resolve(__dirname, '../src/app'), path.resolve(__dirname, '../src/assets/images'), path.resolve(__dirname, '../../ui')],
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024
          }
        }
      },
      {
        test: /\.svg$/,
        include: path.resolve(__dirname, '../src/assets/iconsLocal'),
        use: [
          { loader: 'svg-sprite-loader', options: {} },
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                {
                  name: 'removeAttrs',
                  params: { attrs: 'fill' }
                }
              ]
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', 'jsx'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      '@ui': path.resolve(__dirname, '../../ui/')
    },
    fallback: {
      'react/jsx-runtime': path.resolve(__dirname, '../public/lib/react/jsx-runtime.js'),
      os: require.resolve('os-browserify/browser'),
      https: require.resolve('https-browserify'),
      http: require.resolve('stream-http'),
      stream: require.resolve('stream-browserify'),
      path: false,
      browser: false,
      assert: require.resolve('assert/'),
      wagmi: require.resolve('wagmi'),
      buffer: require.resolve('buffer/'),
      ethers: 'https://static.zypher.game/lib/ethers/5.7.2/ethers.umd.min.js'
    }
  }
}
