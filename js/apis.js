var apis = {
  callWikipedia: function(text, callback) {
    $.ajax({
      url: 'https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=&explaintext=',
      jsonp: 'callback',
      data: $.param({
        titles: text,
        format: 'json'
      }),
      dataType: 'jsonp',
      type: 'POST',
      headers: { 'Api-User-Agent': 'Example/1.0' },
      success: callback
    });
  },

  callYelp: function(text, bounds, callback) {
    $.ajax({
      url: '/yelp',
      data: $.param({
        bounds: bounds.south + ',' + bounds.west + '|' + bounds.north + ',' + bounds.east,
        term: text
      }),
      format: 'json',
      success: callback
    });
  }
};

module.exports = apis;