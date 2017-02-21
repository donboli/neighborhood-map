var places = [
  { title: 'Lorem', position: { lat: 40.77, lng: -73.9623 } },
  { title: 'ipsum', position: { lat: 40.775, lng: -73.9632 } },
  { title: 'dolor', position: { lat: 40.773, lng: -73.9642 } },
  { title: 'sit', position: { lat: 40.774, lng: -73.9612 } },
  { title: 'amet', position: { lat: 40.7756, lng: -73.9632 } },
  { title: 'consectetur', position: { lat: 40.7734, lng: -73.96342 } },
  { title: 'adipisicing', position: { lat: 40.7745, lng: -73.96321 } },
  { title: 'elit', position: { lat: 40.7734, lng: -73.96421 } },
  { title: 'Delectus', position: { lat: 40.7764, lng: -73.96123 } },
  { title: 'esse', position: { lat: 40.77564, lng: -73.96653 } }
];

function placesViewModel() {
  var self = this;

  self.places = ko.observableArray(places);
  self.filter = ko.observable();
  self.filteredPlaces = ko.observableArray(self.places());

  self.filterPlaces = function() {
    var filterValue = new RegExp(self.filter(), "g");

    self.filteredPlaces(self.places().filter(function(place) {
      return filterValue.test(place.title);
    }, self));

    window.mapComponent.refreshMap(self.filteredPlaces());
  }
};

ko.applyBindings(placesViewModel);