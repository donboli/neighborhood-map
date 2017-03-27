var path = require('path');
var OAuth = require('oauth');
var webpack = require('webpack');
var config = require('./config');
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
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    setup(app){
      app.get('/yelp', function(req, response) {
        var oauth = new OAuth.OAuth(
          null,
          null,
          config.consumer_key,
          config.consumer_secret,
          '1.0',
          null,
          'HMAC-SHA1'
        );
        oauth.get(
          'https://api.yelp.com/v2/search?term=' + req.query.term +
          '&bounds=' + req.query.bounds,
          config.token,
          config.token_secret,
          function (e, data, res){
            if (e) console.error(e);
            response.json({ custom: data });
          }
        );
      });
    }
  }
}