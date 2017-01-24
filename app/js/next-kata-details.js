const $ = require('jQuery');
const Config = require('electron-config');
const config = new Config();
var markdown = require("markdown").markdown;

let nextKata = config.get('nextKata')

exports.populateNextKata = function() {
  let description = markdown.toHTML(nextKata.description);
  $(".divide-line").removeClass('hidden');
  $(".next-kata-details").removeClass('hidden');
  $("#kata-name").append(nextKata.name);
  $("#kata-rank").append(nextKata.rank);
  $("#kata-description").append(description);
}
