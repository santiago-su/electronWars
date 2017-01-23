const $ = require('jQuery');
const Config = require('electron-config');
const config = new Config();

let user = config.get('user')

exports.populateUserDetails = function() {
  console.log(user)
  let badge = `<img src='https://www.codewars.com/users/${user.username}/badges/large'>`
  $(".user-details").removeClass('hidden');
  $(".user-details").prepend(badge);
  $("#username-detail").append(user.username);
  $("#name-detail").append(user.name);
  $("#honor-detail").append(user.honor);
  $("#completed-detail").append(user.codeChallenges.totalCompleted);
  $("#clan-detail").append(user.clan);
  $("#leaderboard-detail").append(user.leaderboardPosition);
  $("#languages-detail").append(Object.keys(user.ranks.languages).join(", "));
}
