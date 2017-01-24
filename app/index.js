const $ = require('jQuery');
const {ipcRenderer} = require('electron')
const Config = require('electron-config');
const config = new Config();
const api = require('./js/api.js');
const populateUser = require('./js/user-details.js');
const nextKata = require('./js/next-kata-details.js');

let signInBtn = $('#getUserBtn');
let trainBtn = $('#train-next');

function hideElement(element) {
  $(element).addClass('hidden');
}

signInBtn.on('click', (e) => {
  e.preventDefault();

  let username = $('#username').val();
  let secretKey = $('#apikey').val();
  config.set('apiKey', secretKey);

  api.getUserInfo(username)
  .then(user => {
    config.set('user', user);
    hideElement('.user-login');
    populateUser.populateUserDetails();
  })
  .then(() => {
    return api.getNextKata();
  })
  .then(data => {
    config.set('nextKata', data);
    nextKata.populateNextKata();
  })
  .catch(err => {
    config.set('errors', err);
    // TODO: HANDLE ERRORS
  });
})

trainBtn.on('click', (e) => {
  ipcRenderer.send('openREPL', "something")
})
