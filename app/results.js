var seedrandom = require('seedrandom');
var moment = require('moment');

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

  // Randomize a date between 1980 and 2015
  var date = moment.unix(315532800 + (rand * 1104537600));

  var result = {
    'title': address.join(','),
    'address': address,
    'id': i,
    'tenure': tenures[Math.floor(rand * tenures.length)],
    'title_number': 'FAKE' + Math.floor(rand * 1000000),
    'owner': firstNames[Math.floor(rand * firstNames.length)] + ' ' + lastNames[Math.floor(rand * lastNames.length)],
    'date': date.format('D MMMM YYYY')
  };

  // Lease term if it's *not* freehold
  if(result.tenure !== 'freehold') {
    result.lease_term = 50 + Math.floor(rand * 50);
  }

  if(rand > 0.3) {
    result.lender_name = 'Abbey National PLC';
    result.lender_address = [ 
      '101 Midsummer Boulevard',
      'Milton Keynes',
      'MK9 1AA'
    ];
  }

  // If it's newer than 2000, display a price
  if(date.isAfter('2000-01-01')) {
    result.price = Math.floor(100 + (rand * 300));
  }

  results.push(result);
}

module.exports = results;