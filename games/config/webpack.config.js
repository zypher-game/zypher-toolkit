/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const WebpackBar = require('webpackbar')
// const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')
const { cssLoader } = require('./utils/cssLoader')
const { VanillaExtractPlugin } = require('@vanilla-extract/webpack-plugin')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')

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
    // new AntdDayjsWebpackPlugin(),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$|^\.\/lib\/chart\/(.)*/,
      contextRegExp: /moment$|echarts$/
    }),
    new WebpackBar(),
    new HtmlWebpackPlugin({ template: './public/index.html' }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: '[name].[contenthash:8].bundle.css',
      chunkFilename: '[id].[contenthash:8].chunk.css',
      ignoreOrder: false // Enable to remove warnings about conflicting order
    }),
    // new webpack.ProvidePlugin({
    //   process: 'process/browser.js',
    //   Buffer: ['buffer', 'Buffer']
    // })
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'react',
          entry: {
            path: 'https://static-dev.zypher.game/lib/react/react-v18.0.0.production.min.js',
            type: 'js'
            // cwpPatternConfig: {
            // context: path.resolve(__dirname, '../public/lib')
            // }
          },
          global: 'React'
        },
        {
          module: 'react-dom',
          entry: {
            path: 'https://static-dev.zypher.game/lib/react-dom/react-dom-v18.0.0.production.min.js',
            type: 'js'
            // cwpPatternConfig: {
            // context: path.resolve(__dirname, '../public/lib')
            // }
          },
          global: 'ReactDOM'
        },
        {
          module: 'crypto',
          entry: {
            path: 'https://static.zypher.game/lib/crypto/crypto-browserify/3.12.0/crypto-browserify.js',
            type: 'js'
            // cwpPatternConfig: {
            // context: path.resolve(__dirname, '../public/lib')
            // }
          },
          global: 'crypto'
        },
        {
          module: 'ethers',
          entry: {
            path: 'https://static.zypher.game/lib/ethers/5.7.2/ethers.umd.min.js',
            type: 'js'
            // cwpPatternConfig: {
            // context: path.resolve(__dirname, '../public/lib')
            // }
          },
          global: 'ethers'
        }
        // {
        //   module: 'ethereum-multicall',
        //   entry: {
        //     path: 'https://static.zypher.game/lib/ethereum-multicall/2.12.0/ethereum-multicall.js',
        //     type: 'js'
        //     // cwpPatternConfig: {
        //     // context: path.resolve(__dirname, '../public/lib')
        //     // }
        //   },
        //   global: 'ethereum-multicall'
        // }
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
      // '@my/rainbowkit': require.resolve('@my/rainbowkit')
      // lodash: 'lodash',
      // wagmi: 'wagmi',
    },
    fallback: {
      'react/jsx-runtime': path.resolve(__dirname, '../public/lib/react/jsx-runtime.js'),
      // react: 'https://static.zypher.game/lib/react/react.production.min.js',
      // 'react-dom': 'https://static.zypher.game/lib/crypto/crypto-browserify/3.12.0/crypto-browserify.js',
      // '@zypher-game/toolkit/rainbowkit': false,
      // '@my/rainbowkit': require.resolve('@my/rainbowkit'),
      // axios: require.resolve('axios'),
      // recoil: require.resolve('recoil'),
      // 'mobile-browser': require.resolve('mobile-browser'),
      // 'react-i18next': require.resolve('react-i18next'),
      // 'i18next-http-backend': require.resolve('i18next-http-backend'),
      // 'i18next-browser-languagedetector': require.resolve('i18next-browser-languagedetector'),
      // i18next: require.resolve('i18next'),
      // '@particle-network/auth': require.resolve('@particle-network/auth'),
      // '@particle-network/rainbowkit-ext': require.resolve('@particle-network/rainbowkit-ext'),
      // wagmi: require.resolve('wagmi'),
      // 'wagmi/chains': require.resolve('wagmi/chains'),
      // 'bignumber.js': require.resolve('bignumber.js'),
      os: require.resolve('os-browserify/browser'),
      https: require.resolve('https-browserify'),
      http: require.resolve('stream-http'),
      stream: require.resolve('stream-browserify'),
      path: false,
      browser: false,
      assert: require.resolve('assert/'),
      wagmi: require.resolve('wagmi'),
      // fs: false,
      // antd: false,
      // net: false,
      // tls: false,
      // zlib: false,
      // crypto: false,
      buffer: require.resolve('buffer/'),

      // ethers: path.resolve(__dirname, '../public/lib/ethers/5.7.2/'),
      // 'ethereum-multicall': path.resolve(__dirname, '../public/lib/ethereum-multicall/2.12.0/')

      ethers: 'https://static.zypher.game/lib/ethers/5.7.2/ethers.umd.min.js'
      // 'ethereum-multicall': 'https://static.zypher.game/lib/ethereum-multicall/2.12.0/ethereum-multicall.js'
    }
  }
}
