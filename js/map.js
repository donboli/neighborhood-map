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

  var mapComponent = {
    currentMarkers: [],

    refreshMap: function(places) {
      this.removeAllMarkers();
      this.renderMarkers(places);
      this.focusMap(this.currentMarkers);
    },

    removeAllMarkers: function() {
      this.currentMarkers.forEach(function(marker) {
        marker.setMap(null);
      });
    },

    focusMap: function(markers) {
      var bounds = new google.maps.LatLngBounds();

      markers.forEach(function(marker) {
        bounds.extend(marker.position);
      })

      map.fitBounds(bounds);
    },

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