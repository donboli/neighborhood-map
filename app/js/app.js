var mapComponent = require('./map');
var ko = require('knockout');

$(document).ready(function() {
  $.getJSON("/places.json")
  .done(function(data) {
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

      // Focus on search field after opening off-canvas menu
      self.toggleFocus = function(elem, event) {
        if($(event.target).hasClass('is-open')) {
          $('.js-search-field').focus();
        }
      };

      $(document).ready(function() {
        mapComponent.init(self.places());
      });
    }

    ko.applyBindings(placesViewModel);
  })
  .fail(function() {
    alert("Couldn't load places. Please try again later or contact the site administrator.");
  });
});