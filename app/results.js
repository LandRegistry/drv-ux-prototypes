var seedrandom = require('seedrandom');
var moment = require('moment');
var yaml = require('yamljs');
var fs = require('fs');

var results = yaml.parse(fs.readFileSync('app/results.yaml', 'utf8'));

results.forEach(function(result, index) {

  if(!result.has_data) {
    result.empty = true;
  }

  result.id = index + 1;

  switch(result.tenure) {
    case 'Caution against first registration':
      result.tenure_caution = true;

      break;

    case 'Leasehold':
      result.owner_label = 'leaseholder';
      result.tenure_leasehold = true;

      break;

    case 'Freehold':
      result.owner_label = 'owner';
      result.tenure_freehold = true;

      break;

  }

});

module.exports = results;
