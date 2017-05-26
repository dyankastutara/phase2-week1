var jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
  verifyToken: (req, res, next) => {
    jwt.verify(req.body.token, process.env.JWT_SECRET, (err, decoded) => {
      if(decoded) {
        req.decoded = decoded
        next();
      }
      else {
        res.send(err)
      }
    })
  }
}