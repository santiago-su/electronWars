const https = require('https');
const Config = require('electron-config');
const config = new Config();

let hostname = 'www.codewars.com';
let basePath = '/api/v1';

function makeRequest(method, route, postData) {
  let apiKey = config.get('apiKey');
  let options = {
    hostname: hostname,
    path: basePath + route,
    method: method,
    headers: {
      'Authorization': apiKey
    },
    json: true
  };

  if (typeof postData !== 'undefined' && method === 'POST') {
    postData = JSON.stringify(postData);
    options.headers['Content-Type'] = 'application/json';
    options.headers['Content-Length'] = postData.length;
  }

  return new Promise(function(resolve, reject) {
    let response = '';

    let req = https.request(options, function(res) {
      res.on('data', function(data) {
        response += data;
      });

      res.on('end', function() {
        resolve(JSON.parse(response));
      })
    });

    if (typeof postData !== 'undefined' && method === 'POST') {
      req.write(postData);
    }

    req.on('error', function(err) {
      console.log('https error! %s: %s', err.name, err.message);
      reject(err);
    });

    req.end();
  });
}

// GET user request to codewars API
exports.getUserInfo = function(user) {
  let method = 'GET';
  let route = `/users/${user}`;
  return makeRequest(method, route);
}

// GET next kata request to codewars API
exports.getNextKata = function() {
  let method = 'POST';
  let route = '/code-challenges/javascript/train?peek=true'
  return makeRequest(method, route);
}

// POST start next Kata to codewars API
exports.startNextKata = function() {
  let method = 'POST';
  let route = '/code-challenges/javascript/train'
  let apiKey = config.get('apiKey');
  return makeRequest(method, route);
}

// POST https://www.codewars.com/api/v1/code-challenges/projects/:project_id/solutions/:solution_id/attempt
exports.testNextKata = function(kata, answerCode) {
  let method = 'POST';
  let projectId = kata.session.projectId;
  let solutionId = kata.session.solutionId;
  let route = `/code-challenges/projects/${projectId}/solutions/${solutionId}/attempt`
  let postData = { code: answerCode, output_format: 'raw' };
  return makeRequest(method, route, postData);
}

// DEFERRED RESPONSE
exports.getDeferredResponse = function(dmid) {
  let FREQUENCY = 2000;
  let route = `/deferred/${dmid}`;
  let method = 'GET';
  return new Promise(function(resolve) {
    let poller = setInterval(function() {
      makeRequest(method, route)
        .then(function(data) {
          if (data.success !== true) return;
          clearInterval(poller);
          resolve(data);
        });
    }, FREQUENCY);
  });
};
