var seedrandom = require('seedrandom');
var moment = require('moment');
var yaml = require('yamljs');
var fs = require('fs');

module.exports = function() {
  var results = yaml.parse(fs.readFileSync('app/results.yaml', 'utf8'));

  results.forEach(function(result, index) {

    if(!result.has_data) {
      result.empty = true;
    }

    if(!result.owner_address) {
      result.owner_address = result.address;
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

  return results;
}

