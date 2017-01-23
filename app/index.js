const $ = require('jQuery');
const Config = require('electron-config');
const config = new Config();
const login = require('./js/login.js').getUserInfo;
const populateUser = require('./js/user-details.js').populateUserDetails;

let signInBtn = $('#getUserBtn');

function hideElement(element) {
  $(element).addClass('hidden');
}

signInBtn.on('click', (e) => {
  e.preventDefault();

  let username = $('#username').val();
  let secretKey = $('#apikey').val();
  config.set('apiKey', secretKey);

  login(username)
  .then(u => {
    config.set('user', u);
    hideElement('.user-login');
    populateUser();
  })
  .catch(err => {
    config.set('errors', err);
    // TODO: HANDLE ERRORS
    // hideElement('.user-login');
  });
})
