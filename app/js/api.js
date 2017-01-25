const rp = require('request-promise');
const Config = require('electron-config');
const config = new Config();

// GET user request to codewars API
exports.getUserInfo = function(user) {
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

// GET next kata request to codewars API
exports.getNextKata = function() {
  let apiKey = config.get('apiKey');
  let options = {
    uri: 'https://www.codewars.com/api/v1/code-challenges/javascript/train?peek=true',
    headers: { 'User-Agent': 'Request-Promise',
               'Authorization': apiKey
             },
    method: 'POST',
    json: true // Automatically parses the JSON string in the response
  }
  return rp(options);
}

// POST start next Kata to codewars API
exports.startNextKata = function() {
  let apiKey = config.get('apiKey');
  let options = {
    uri: 'https://www.codewars.com/api/v1/code-challenges/javascript/train',
    headers: { 'User-Agent': 'Request-Promise',
               'Authorization': apiKey
             },
    method: 'POST',
    json: true // Automatically parses the JSON string in the response
  }
  return rp(options);
}
