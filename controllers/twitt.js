var twitts = require('../models/twitts');

module.exports = {
  twetting: function(req, res, next){
    var post = req.body.post;
    twitts.posting(post, (data)=>{
      res.send(data)
    })
  },
  destroyTwett: function(req, res, next){
    var id = req.body.id;
    twitts.delete(id, (data)=>{
      res.send('status is deleted! \n'+data);
    })
  },
  retwetting: function(req, res, next){
    var id = req.params.id;
    twitts.retwett(id, (data)=>{
      res.send('retweet sucsess! \n'+data);
    })
  },
  searchPost: function(req, res, next){
    var text = req.params.seacrhpost;
    twitts.searchPost(text, (data)=>{
      res.send(data);
    })
  },
  trending: function(res, req, next){
    twitts.trend((data)=>{
      res.send(data);
    })
  },
  search: function(req, res, next){
    twitts.search(req.params.username, (data)=>{
      res.send(data);
    })
  }
}
