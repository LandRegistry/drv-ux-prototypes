var seedrandom = require('seedrandom');

var results = [];
var numResults = 50;

var tenures = [
  'Freehold',
  'Leasehold'
];

var firstNames = ['Fred', 'Bob', 'George', 'Julia', 'Sophie', 'David', 'Andy', 'Heather'];
var lastNames = ['Smith', 'Jones', 'McDonald'];

for(var i=1; i<=numResults; i++) {
  var address = [
    i + ' Pretend Street',
    'Trumpton',
    'TR15 5RZ'
  ];

  var rand = seedrandom(i)();

  results.push({
    'title': address.join(','),
    'address': address,
    'id': i,
    'tenure': tenures[Math.floor(rand * tenures.length)],
    'title_number': 'DN' + Math.floor(rand * 1000000),
    'owner': firstNames[Math.floor(rand * firstNames.length)] + ' ' + lastNames[Math.floor(rand * lastNames.length)],
  });
}

module.exports = results;