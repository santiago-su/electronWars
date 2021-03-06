const $ = require('jQuery');
const BrowserWindow = require('electron').remote.BrowserWindow;
const path = require('path');
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
    populateUser.populateUserDetails(user);
    return api.getNextKata();
  })
  .then(data => {
    config.set('nextKata', data);
    return nextKata.populateNextKata();
  })
  .catch(err => {
    config.set('errors', err);
    // TODO: HANDLE ERRORS
  });
})

trainBtn.on('click', (e) => {
  const modalPath = path.join('file://', __dirname, './text_editor.html');
  let win = new BrowserWindow({ frame: false, backgroundColor: '#303133' });
  win.on('close', function() { win = null });
  win.loadURL(modalPath);
  win.show();
})
