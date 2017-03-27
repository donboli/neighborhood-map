var path = require('path');
var webpack = require('webpack');
var server = require('./server');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  entry: {
    main: './app/index.js',
    vendor: ['jquery', 'bootstrap']
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      { test: /\.(woff|woff2)$/, use: [ "url-loader" ] },
      { test: /\.eot$/, use: [ "file-loader" ] },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: [ "url-loader" ] },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [ 'css-loader' ]
        })
      },
      { test: /\.(jpg|png|svg)$/, use: [ 'file-loader' ] },
      { test: /\.(html|json)$/, use: [ 'file-loader?name=[name].[ext]' ] }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new ExtractTextPlugin('styles.css'),
    new UglifyJSPlugin(),
    new CompressionPlugin()
  ],
  watch: true,
  devServer: server
};