const rp = require('request-promise');
const Config = require('electron-config');
const config = new Config();
const $ = require('jQuery')

// GET request to codewars API
function getUserInfo(user) {
  let apiKey = config.get('apiKey');
  let options = {
    uri: `https://www.codewars.com/api/v1/users/${user}`,
    headers: { 'User-Agent': 'Request-Promise',
               'Authorization': apiKey
             },
    json: true // Automatically parses the JSON string in the response
  }
  return rp(options);
}

// ||||||||||HTML INTERACTION|||||||||||

let signInBtn = $('#getUserBtn');

signInBtn.on('click', (e) => {
  e.preventDefault();

  let username = $('#username').val();
  let secretKey = $('#apikey').val();
  config.set('apiKey', secretKey);
  getUserInfo(username).then(u => { console.log('User', u);}).catch(err => { console.log('Error', err)});
})
