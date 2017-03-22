var path = require('path');
var OAuth = require('oauth');
var webpack = require('webpack');
var config = require('./config');

module.exports = {
  entry: './app/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      { test: /\.(woff|woff2)$/, use: [ "url-loader" ] },
      { test: /\.eot$/, use: [ "file-loader" ] },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: [ "url-loader" ] },
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
      { test: /\.(jpg|png|svg)$/, use: [ 'file-loader' ] },
      { test: /\.(html|json)$/, use: [ 'file-loader?name=[name].[ext]' ] }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })
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