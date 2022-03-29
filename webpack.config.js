const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')

module.exports = {
  entry: ['./src/Main.js'],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'build.js',
    library: ['VueKeybindings'],
    libraryTarget: 'umd'
  },
  devtool: 'source-map',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          minimize: true,
          warnings: false,
          compress: {}
        },
        sourceMap: true
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      }
    ]
  }
}
