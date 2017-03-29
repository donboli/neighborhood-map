var apis = require('./apis');
var $ = require('jquery');

/*
  This is a component to communicate with the map.
  In order to separate the map from other parts of the app, it's created
  within the initMap function's scope. This way it won't interfere with
  other parts of the app and cleanly separate the concerns.
*/
var mapComponent = {
  currentMarkers: [], // Holds the markers currently displayed on the map
  markers: [], // Holds all created markers

  // Create markers for provided places and place them on the map
  init: function(places) {
    var self = this;

    for (var i = 0; i < places.length; i++) {
      marker = new google.maps.Marker({
        position: places[i].geometry.location,
        title: places[i].name,
        animation: google.maps.Animation.DROP,
        id: places[i].id
      });

      self.markers.push(marker);
      self.currentMarkers.push(marker);

      marker.setMap(map);

      marker.addListener('click', function() {
        self.bounceMarker(this);

        if(!self.infoWindow) {
          self.infoWindow = new google.maps.InfoWindow();
        }
        self.populateInfoWindow(this, self.infoWindow);
      });
    }

    // Keep focus on the markers when resizing the window.
    google.maps.event.addDomListener(window, 'resize', function() {
      self.focusMap(self.currentMarkers);
    });

    self.refreshMap(places);
  },

  // Show only markers on the map corresponding to provided places
  refreshMap: function(places) {
    this.removeAllMarkers();
    this.renderMarkers(places);
    this.focusMap(this.currentMarkers);
  },

  // Removes all current markers from the map
  removeAllMarkers: function() {
    this.currentMarkers.forEach(function(marker) {
      marker.setMap(null);
    });
  },

  // Focuses the map on the markers provided as parameters
  focusMap: function(markers) {
    var bounds = new google.maps.LatLngBounds();

    markers.forEach(function(marker) {
      bounds.extend(marker.position);
    });

    map.fitBounds(bounds);
  },

  selectMarker: function(id) {
    var selectedMarker = this.currentMarkers.find(function(marker) {
      return marker.id == id;
    });

    new google.maps.event.trigger(selectedMarker, 'click');
  },

  // Creates markers from an array of places and renders them on the map
  renderMarkers: function(places) {
    var marker;
    var self = this;

    places.forEach(function(place) {
      marker = self.markers.find(function(marker) {
        return marker.id == place.id;
      });

      marker.setMap(map);
    });
  },

  // Create Yelp info element
  formatYelpInfo: function(data) {
    var business = JSON.parse(data[0].custom).businesses[0];

    if (business != undefined) {
      return (
        '<a target="_blank" href=\'' + business.url + '\'>' + business.name + '</a><br/>' +
        '<span>Phone: ' + business.display_phone + '</span><br/>' +
        '<span>Description: ' + business.snippet_text + '</span><br/>' +
        '<img src=\'' + business.image_url + '\'/>'
      );
    } else {
      return '<p>No Yelp information found</p>';
    }
  },

  // Create Wikipedia info element
  formatWikipediaInfo: function(data) {
    if (data.query) {
      var pages = data.query.pages;
      for(var property in pages) {
        if(pages.hasOwnProperty(property)) {
          return (
            '<div>' + pages[property].title + '</div>' +
            '<p>' + pages[property].extract + '</p>'
          );
        }
      }
    } else {
      return '<p>No Wikpedia article found</p>';
    }
  },

  bounceMarker: function(marker) {
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function() {
      marker.setAnimation(null);
    }, 750);
  },

  populateInfoWindow: function(marker, infowindow) {
    var self = this;

    if (infowindow.marker != marker) {
      // call Wikipedia and Yelp APIs
      var wikipediaCall = apis.callWikipedia(marker.title);
      var yelpCall = apis.callYelp(marker.title, map.getBounds().toJSON());

      $.when(wikipediaCall, yelpCall)
      .done(function(wikipediaData, yelpData) {
        var content = '';

        // get formatted content and concatenate it
        [
          self.formatWikipediaInfo(wikipediaData),
          self.formatYelpInfo(yelpData)
        ].forEach(function(text) {
          content += text;
        });

        infowindow.setContent(content);
        infowindow.open(map, marker);
      })
      .fail(function(wikipediaError, yelpError) {
        if("error" == yelpError) {
          console.log("Error: Couldn't load Yelp API");
        }
        if(wikipediaError.status == 404) {
          console.log("Error: Couldn't load Wikipedia API");
        }
        alert('Connection failed. Please check your internet connection or retry later.');
      });
    }
  }
};

module.exports = mapComponent;