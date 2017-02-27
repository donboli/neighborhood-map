// Test data for use without places.json
// var places = [
//   { name: 'Lorem', geometry: { location: { lat: 40.77, lng: -73.9623 } } },
//   { name: 'ipsum', geometry: { location: { lat: 40.775, lng: -73.9632 } } },
//   { name: 'dolor', geometry: { location: { lat: 40.773, lng: -73.9642 } } },
//   { name: 'sit', geometry: { location: { lat: 40.774, lng: -73.9612 } } },
//   { name: 'amet', geometry: { location: { lat: 40.7756, lng: -73.9632 } } },
//   { name: 'consectetur', geometry: { location: { lat: 40.7734, lng: -73.96342 } } },
//   { name: 'adipisicing', geometry: { location: { lat: 40.7745, lng: -73.96321 } } },
//   { name: 'elit', geometry: { location: { lat: 40.7734, lng: -73.96421 } } },
//   { name: 'Delectus', geometry: { location: { lat: 40.7764, lng: -73.96123 } } },
//   { name: 'esse', geometry: { location: { lat: 40.77564, lng: -73.96653 } } }
// ];

$(document).ready(function() {
  $.getJSON("/places.json", function(data) {
    function placesViewModel() {
      var self = this;

      self.places = ko.observableArray(data);
      self.filter = ko.observable();
      self.filteredPlaces = ko.observableArray(self.places());

      self.filterPlaces = function() {
        var filterValue = new RegExp(self.filter(), "i");

        self.filteredPlaces(self.places().filter(function(place) {
          return filterValue.test(place.name);
        }, self));

        window.mapComponent.refreshMap(self.filteredPlaces());
      }

      $(document).ready(function() {
        window.mapComponent.refreshMap(self.filteredPlaces());
      });
    };

    ko.applyBindings(placesViewModel);
  });
});