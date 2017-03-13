//var path = require('path');
module.exports = {
  entry: './src/main.js',
  output: {
    path: './dist',
    publicPath:'dist/',
    filename: 'build.js'
  },
  module: {
    loaders: [
      //转化ES6语法
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  devServer: { inline: true }
}