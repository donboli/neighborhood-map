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
            // console.log(require('util').inspect(data));
            response.json({ custom: data });
          }
        );
      });
    }
  }
}