const OAuth = require('oauth');
require('dotenv').config();

var oauth = new OAuth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  process.env.consumerKey, //ganti dengan env file nya
  process.env.consumerSecret, //ganti dengan env file nya
  '1.0A',
  null,
  'HMAC-SHA1'
);

module.exports = {
  posting: (text, callback)=>{
    oauth.post(
      'https://api.twitter.com/1.1/statuses/update.json?status='+text,
      process.env.accessToken,
      process.env.accessTokenSecret,
      text,
      'text',
      function(e, data){
        if(e){
          console.log(e);
        } else {
          callback(data);
        }
      }
    );
  },
  searchPost : (search, callback)=>{
    oauth.get(
      `https://api.twitter.com/1.1/search/tweets.json?q=${search}`,
      process.env.accessToken, //test user token
      process.env.accessTokenSecret, //test user secret
      function (e, data){
        if (e) console.error(e);
        next(data);
      });
  }
  delete: function(id, callback)=>{
    oauth.post(
      `https://api.twitter.com/1.1/statuses/destroy/:${id}.json`,
      process.env.accessToken,
      process.env.accessTokenSecret,
      id,
      'id',
      function(e, data){
        if(e){
          console.log(e);
        } else {
          callback(data);
        }
      }
    );
  },
  retwett: function(id, callback)=>{
    oauth.post(
      `https://api.twitter.com/1.1/statuses/retweet/:${id}.json`,
      process.env.accessToken,
      process.env.accessTokenSecret,
      id,
      'id',
      function(e, data){
        if(e){
          console.log(e);
        } else {
          callback(data);
        }
      }
    );
  }
}
