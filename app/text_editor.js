const $ = require('jQuery');
const Config = require('electron-config');
const config = new Config();
const api = require('./js/api.js');
const nextKata = require('./js/next-kata-details.js');
const js = require("../cm/mode/javascript/javascript");
const codeMirror = require("../cm/lib/codemirror");

api.startNextKata().
then(kata => {
  config.set('nextKata', kata);
  nextKata.populateNextKataEditor(kata);
}).catch(err => {
  config.set('errors', err);
  // TODO: HANDLE ERRORS
})

let cm = codeMirror.fromTextArea(document.getElementById("editor"), {
  mode: {name: "javascript", json: true },
  lineNumbers: true,
  theme: "lesser-dark"
});

cm.setValue(config.get('nextKata').session.setup)
