var path = require('path');
var OAuth = require('oauth');
var webpack = require('webpack');
var config = require('./config');

module.exports = {
  entry: './js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/js')
  },
  // plugins: [
  //   new webpack.LoaderOptionsPlugin({
  //     debug: true
  //   })
  // ],
  watch: true,
  devServer: {
    setup(app){
      app.get('/yelp', function(req, response) {
        var oauth = new OAuth.OAuth(
          config.token_secret,
          config.token,
          config.consumer_key,
          config.consumer_secret,
          '1.0A',
          null,
          'HMAC-SHA1'
        );
        oauth.get(
          'https://api.twitter.com/1.1/trends/place.json?id=23424977',
          'your user token for this app', //test user token
          'your user secret for this app', //test user secret
          function (e, data, res){
            if (e) console.error(e);
            // console.log(require('util').inspect(data));
            response.json({ custom: data });
          }
        );
      });
    }
  }
}