const $ = require('jQuery');
const Config = require('electron-config');
const config = new Config();
const api = require('./js/api.js');
const nextKata = require('./js/next-kata-details.js');
const js = require("../cm/mode/javascript/javascript");
const codeMirror = require("../cm/lib/codemirror");
const remote = require('electron').remote;

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


//////////////////// HTML INTERACTION ///////////////////////////

let cm = codeMirror.fromTextArea(document.getElementById("editor"), {
  mode: {name: "javascript", json: true },
  lineNumbers: true,
  theme: "lesser-dark"
});

$("#test-kata").on('click', () => {
  api.testNextKata(config.get('nextKata'),cm.getValue())
  .then(response => {
    return api.getDeferredResponse(response.dmid)
  })
  .then((data) => {
    $(".test-results").html(data.output['0']);
    if (data.valid == false) {
      $(".test-results").removeClass('hidden');
    } else {
      config.set('finalProjectId', config.get('nextKata').session.projectId)
      config.set('finalSolutionId', data.solution_id);
      $("#submit-kata").attr('disabled', false)
    }
  })
  .catch(err => {
    // TODO: HANDLE ERRORS
  })
})

$("#submit-kata").on('click', () => {
  api.finalSolution(config.get('finalProjectId'), config.get('finalSolutionId'))
  .then(() => {
    let window = remote.getCurrentWindow();
    window.close()
  })
  .catch(err => {
    // TODO: HANDLE ERRORS
  })
})
