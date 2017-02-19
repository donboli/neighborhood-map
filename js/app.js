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

var placesViewModel = {
  places: places,
  filter: ko.observable()
};

ko.applyBindings(placesViewModel);