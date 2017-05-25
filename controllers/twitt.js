var twitts = require('../models/twitts');

module.exports = {
  twetting: function(req, res, next){
    var post = req.body.post;
    twitts.posting(post, (data)=>{
      res.send(data)
    })
  },
  destroyTwett: function(req, res, next){
    var id = req.params.id;
    twitts.delete(id, (data)=>{
      res.send('status is deleted! \n'+data);
    })
  }
  retwetting: function(req, res, next){
    var id = req.params.id;
    twitts.retwett(id, (data)=>{
      res.send('retweet sucsess! \n'+data);
    })
  }
}
