var $ = require('jquery');

var apis = {
  callWikipedia: function(text) {
    return $.ajax({
      url: 'https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=&explaintext=',
      jsonp: 'callback',
      data: $.param({
        titles: text,
        format: 'json'
      }),
      dataType: 'jsonp',
      type: 'POST',
      headers: { 'Api-User-Agent': 'Example/1.0' }
    });
  },

  callYelp: function(text, bounds) {
    return $.ajax({
      url: '/yelp',
      data: $.param({
        bounds: bounds.south + ',' + bounds.west + '|' + bounds.north + ',' + bounds.east,
        term: text
      }),
      format: 'json'
    });
  }
};

module.exports = apis;