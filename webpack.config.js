const path = require('path')

const mode = process.env.NODE_ENV
const devMode = mode === 'development'
const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined

module.exports = {
  mode,
  target,
  devtool,
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'), // folder
    clean: true, // clear before build
    filename: 'index.[contenthash].js',
  }
}