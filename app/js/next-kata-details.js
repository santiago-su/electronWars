const $ = require('jQuery');
const rp = require('request-promise');
const Config = require('electron-config');
const config = new Config();

let nextKata = config.get('nextKata')

exports.populateNextKata = function() {
  console.log(nextKata);
  $(".next-kata-details").removeClass('hidden');
  $("#kata-name").append(nextKata.name);
  $("#kata-rank").append(nextKata.rank);
  $("#kata-description").append(nextKata.description);
}
