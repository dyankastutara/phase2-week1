var OAuth = require('oauth');
require('dotenv').config()

module.exports = {
  getOauth: (callback) => {
    var oauth = new OAuth.OAuth(
      'https://api.twitter.com/oauth/request_token',
      'https://api.twitter.com/oauth/access_token',
      process.env.API_KEY,
      process.env.API_SECRET,
      '1.0A',
      null,
      'HMAC-SHA1'
    );
    callback(oauth)
  }
}