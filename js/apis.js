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
  }
};

module.exports = apis;