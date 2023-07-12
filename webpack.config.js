const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const mode = process.env.NODE_ENV
const devMode = mode === 'development'
const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined

module.exports = {
  mode,
  target,
  devtool,
  devServer: {
    port: 3000,
    open: true,
    hot: true,
  },
  entry: [
    "@babel/polyfill", // dependency injected
    path.resolve(__dirname, 'src', 'index.js') // main entry point
  ],
  output: {
    path: path.resolve(__dirname, 'dist'), // folder
    clean: true, // clear before build
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/[name][hash][ext]', // for img
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    })
  ],
  module: {
    rules: [
      // html
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      // css
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [
          devMode ? 'style-loader': MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('postcss-preset-env')]
              }
            }
          },
          "sass-loader",
        ],
      },
      // js
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      },
      // fonts
      {
        test: /\.(?:woff|woff2|ttf)$/i,
        type: 'asset/resource',
        generator: { // if disable generator then all fonts put in `output.assetModuleFilename` config
          filename: 'fonts/[name]rrк[ext]',
        }
      },
      // img
      {
        test: /\.(?:jp?eg|gif|webp|png|svg)$/i,
        type: 'asset/resource',
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              // algorithms of compress:
              // jpeg
              mozjpeg: {
                progressive: true,
              },
              // png
              optipng: {
                enabled: false, // disabled
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              // gif
              gifsicle: {
                interlaced: false,
              },
              // webp
              webp: {
                quality: 75
              }
            }
          },
        ],
      },
    ]
  }
}