const rp = require('request-promise');
const Config = require('electron-config');
const config = new Config();

// GET request to codewars API
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
