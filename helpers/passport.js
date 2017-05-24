const User = require('../models/user.js');
// const userControl = require('../controllers/userController.js');
const passport = require('passport');
var bcrypt   = require('bcrypt');

let passportLocal = (username, password, next) => {
  User.findOne({username: username}, (err, user) => {
    if (err) {return next(err);}
    if (username==null) { return next(null,{msg:'Username can not empty'}); }
    if (!user) { return next(null,{msg:'Username or Password is Wrong'} ); }
    if (!bcrypt.compareSync(password, user.password)) {return next(null, {msg:'Username or Password is Wrong'}); }
    return next(null, user);
  });
}
module.exports = passportLocal;