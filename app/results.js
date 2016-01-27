var seedrandom = require('seedrandom');
var moment = require('moment');

/**
 * NOTE:
 * THIS FILE IS DEPRECATED IN FAVOUR OF results.yaml
 */

var results = [];
var numResults = 50;

var tenures = [
  'Freehold', 'Freehold', 'Freehold', 'Freehold', 'Freehold', 'Freehold', 'Freehold', 'Freehold', // TODO: Do this in a less stupid way
  'Leasehold', 'Leasehold', 'Leasehold', 'Leasehold', 'Leasehold', 'Leasehold', 'Leasehold', 'Leasehold',
  'Caution against first registration'
];

var firstNames = ['Fred', 'Bob', 'George', 'Julia', 'Sophie', 'David', 'Andy', 'Heather'];
var lastNames = ['Smith', 'Jones', 'McDonald'];


for(var i=1; i<=numResults; i++) {
  var address = [
    'Pretend Street',
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
    'title_prefix': i,
    'tenure': tenures[Math.floor(rand * tenures.length)],
    'title_number': 'FAKE' + Math.floor(rand * 1000000),
    'owner': firstNames[Math.floor(rand * firstNames.length)] + ' ' + lastNames[Math.floor(rand * lastNames.length)],
    'owner_label': 'owner',
    'date': date.format('D MMMM YYYY'),
    'has_data': rand > 0.1,

    'empty': rand <= 0.1  // Inverted boolean of the above, because mustache does not have logic so we have to use "guarded ifs"
  };

  switch(result.tenure) {
    case 'Caution against first registration':
      result.title_number_prefix = 'Caution ';
      result.title_prefix = 'Land at';
      result.title = address.join(',');
      result.tenure_caution = true;

      break;

    case 'Leasehold':
      result.owner_label = 'leaseholder';
      result.lease_term = 50 + Math.floor(rand * 50);
      result.tenure_leasehold = true;

      break;

    case 'Freehold':
      result.tenure_freehold = true;

      break;

  }

  // Some don't have lenders
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

// var yaml = require('write-yaml');
// yaml.sync('app/results.yaml', results);

module.exports = results;
