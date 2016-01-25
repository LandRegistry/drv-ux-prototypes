var seedrandom = require('seedrandom');
var moment = require('moment');

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
    'date': date.format('D MMMM YYYY'),
    'has_data': rand > 0.1,
    'empty': rand <= 0.1  // Inverted boolean of the above, because mustache does not have logic so we have to use "guarded ifs"
  };

  if(result.tenure === 'Caution against first registration') {
    result.title_number_prefix = 'Caution ';
    result.title_prefix = 'Land at';
    result.title = address.join(',');
  }

  // "Owner" label varies depending on tenure type
  if(result.tenure === 'Leasehold') {
    result.owner_label = 'leaseholder';
  } else {
    result.owner_label = 'owner';
  }

  // Lease term if it's *not* freehold
  if(result.tenure !== 'Freehold') {
    result.lease_term = 50 + Math.floor(rand * 50);
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

module.exports = results;
