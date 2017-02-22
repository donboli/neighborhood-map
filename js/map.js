function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 2,
    center: {lat: 0, lng: -40} // default location
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      map.setCenter(pos);
      map.setZoom(6);
    }, function() {
      console.log("The user's location could not be found.");
    });
  }

  /*
    This is a component to communicate with the map.
    In order to separate the map from other parts of the app, it's created
    within the initMap function's scope. This way it won't interfere with
    other parts of the app and cleanly separate the concerns.
  */
  var mapComponent = {
    currentMarkers: [], // Holds the markers currently displayed on the map.

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
      })

      map.fitBounds(bounds);
    },

    // Creates markers from an array of places and renders them on the map.
    renderMarkers: function(places) {
      var marker;

      for (var i = 0; i < places.length; i++) {
        marker = new google.maps.Marker({
          position: places[i].geometry.location,
          title: places[i].title,
          animation: google.maps.Animation.DROP,
          id: i
        });

        this.currentMarkers.push(marker);

        marker.setMap(map);
      }
    }
  };

  window.mapComponent = mapComponent;
}