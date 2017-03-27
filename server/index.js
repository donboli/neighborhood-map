var config = require('./config');
var OAuth = require('oauth');
var path = require('path');

module.exports = {
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
};