const User = require('../models/user')
const passport = require('passport')
const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy: JwtStrategy } = require('passport-jwt');
const { ExtractJwt } = require('passport-jwt');

const bcrypt = require('bcrypt');

const setLocalStrategy = async (username, password, done) => {
  let user = await User.findOne({
    where: {
      username
    }
  });
  if (!user) {
    return done(null, false, { message: '존재하지 않는 사용자 입니다.' });
  }
  const compareResult = await bcrypt.compare(password, user.password);
  if (compareResult) {
    return done(null, user);
  } else {
    return done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
  }
}



const setJwtStrategy = async (jwt_payload, done) => {

  const user = await User.findOne({
    where: {
      username: jwt_payload.sub
    }
  });

  if (user) {
    return done(null, user);
  } else {
    return done(null, false);
  }

  // User.findOne({id: jwt_payload.sub}, function(err, user) {
  //   if (err) {
  //     return done(err, false);
  //   }
  //   if (user) {
  //     return done(null, user);
  //   } else {
  //     return done(null, false);
  //     // or you could create a new account
  //   }
  // });
}

module.exports = () => {
  const opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = process.env.JWT_KEY;

  passport.use(new LocalStrategy(setLocalStrategy));
  passport.use(new JwtStrategy(opts, setJwtStrategy));
}


