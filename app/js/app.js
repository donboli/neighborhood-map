var mapComponent = require('./map');
var ko = require('knockout');

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

        mapComponent.refreshMap(self.filteredPlaces());
      };

      self.selectMarker = function() {
        mapComponent.selectMarker(this.id);
      };

      $(document).ready(function() {
        mapComponent.refreshMap(self.filteredPlaces());
      });
    };

    ko.applyBindings(placesViewModel);
  });
});