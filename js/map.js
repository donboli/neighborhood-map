function initMap() {
  var map = new google.maps.Map(document.getElementById('map'));

  /*
    This is a component to communicate with the map.
    In order to separate the map from other parts of the app, it's created
    within the initMap function's scope. This way it won't interfere with
    other parts of the app and cleanly separate the concerns.
  */
  var mapComponent = {
    currentMarkers: [], // Holds the markers currently displayed on the map.
    infoWindow: new google.maps.InfoWindow(),

    refreshMap: function(places) {
      this.removeAllMarkers();
      this.renderMarkers(places);
      this.focusMap(this.currentMarkers);
    },

    // Removes all current markers from the map.
    removeAllMarkers: function() {
      this.currentMarkers.forEach(function(marker) {
        marker.setMap(null);
      });
    },

    // Focuses the map on the markers provided as parameters.
    focusMap: function(markers) {
      var bounds = new google.maps.LatLngBounds();

      markers.forEach(function(marker) {
        bounds.extend(marker.position);
      });

      map.fitBounds(bounds);
    },

    // Creates markers from an array of places and renders them on the map.
    renderMarkers: function(places) {
      var marker;
      var self = this;

      for (var i = 0; i < places.length; i++) {
        marker = new google.maps.Marker({
          position: places[i].geometry.location,
          title: places[i].title,
          animation: google.maps.Animation.DROP,
          id: i
        });

        this.currentMarkers.push(marker);

        marker.setMap(map);

        marker.addListener('click', function() {
          self.populateInfoWindow(this, self.infoWindow);
        });
      }
    },

    populateInfoWindow: function(marker, infowindow) {
      if (infowindow.marker != marker) {
        infowindow.setContent('<div>' + marker.title + '</div>');
        infowindow.open(map, marker);
      }

      $.getJSON("/yelp-search.json", function(data) {
        if(data.businesses.length > 0) {
          var business = data.businesses[0]
          infowindow.setContent(
            "<div>" + business.name + "</div>" +
            "<div>phone: " + business.phone + "</div>" +
            "<img src='" + business.image_url + "' />"
          );
        } else {
          infowindow.setContent("No information available");
        }
      });
    }
  };

  window.mapComponent = mapComponent;
}