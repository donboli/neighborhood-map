var places = [
  { name: 'Lorem' },
  { name: 'ipsum' },
  { name: 'dolor' },
  { name: 'sit' },
  { name: 'amet' },
  { name: 'consectetur' },
  { name: 'adipisicing' },
  { name: 'elit' },
  { name: 'Delectus' },
  { name: 'esse' }
];

function placesViewModel() {
  var self = this;

  self.places = ko.observableArray(places);
  self.filter = ko.observable();

  self.filteredPlaces = ko.computed(function() {
    var filterValue = new RegExp(self.filter(), "g");

    var newPlaces = self.places().filter(function(place) {
      return filterValue.test(place.name);
    }, self);

    return newPlaces;
  });
};

ko.applyBindings(placesViewModel);