const $ = require('jQuery');
const Config = require('electron-config');
const config = new Config();
var markdown = require("markdown").markdown;

let nextKata = config.get('nextKata')

exports.populateNextKata = function() {
  let description = markdown.toHTML(nextKata.description);
  $(".divide-line").removeClass('hidden');
  $(".next-kata-details").removeClass('hidden');
  $(".kata-name").append(nextKata.name);
  $(".kata-rank").append(nextKata.rank);
  $(".kata-description").append(description);
}

exports.populateNextKataEditor = function(kata) {
  let description = markdown.toHTML(kata.description);
  $(".next-kata-details-editor").removeClass('hidden');
  $(".kata-name-editor").append(kata.name);
  $(".kata-rank-editor").append(kata.rank);
  $(".kata-description-editor").append(description);
}
