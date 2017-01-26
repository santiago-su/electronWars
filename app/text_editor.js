const $ = require('jQuery');
const Config = require('electron-config');
const config = new Config();
const api = require('./js/api.js');
const nextKata = require('./js/next-kata-details.js');
const js = require("../cm/mode/javascript/javascript");
const codeMirror = require("../cm/lib/codemirror");

api.startNextKata()
.then(kata => {
  config.set('nextKata', kata);
  nextKata.populateNextKataEditor(kata);
})
.then(() => {
  cm.setValue(config.get('nextKata').session.setup)
})
.catch(err => {
  config.set('errors', err);
  // TODO: HANDLE ERRORS
})

let cm = codeMirror.fromTextArea(document.getElementById("editor"), {
  mode: {name: "javascript", json: true },
  lineNumbers: true,
  theme: "lesser-dark"
});

console.log(config.get('nextKata'))

$("#test-kata").on('click', () => {
  api.testNextKata(config.get('nextKata'),cm.getValue())
  .then(response => {
    console.log(response)
    return api.getDeferredResponse(response.dmid)
  })
  .then((data) => {
    console.log(data)
    $(".test-results").html(data.output[0]);
    if (data.valid == false) {
      console.log(data.output[0]);
      $(".test-results").removeClass('hidden');
    } else {
      config.set('correctSolutionId', data.solution_id);
      $("#submit-kata").attr('disabled', false)
    }
  })
  .catch(err => {
    // TODO: HANDLE ERRORS
  })
})
