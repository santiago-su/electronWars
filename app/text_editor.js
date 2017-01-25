const $ = require('jQuery');
const Config = require('electron-config');
const config = new Config();
const api = require('./js/api.js');
const nextKata = require('./js/next-kata-details.js');

api.startNextKata().
then(kata => {
  config.set('nextKata', kata);
  nextKata.populateNextKataEditor(kata);
}).catch(err => {
  config.set('errors', err);
  // TODO: HANDLE ERRORS
})
