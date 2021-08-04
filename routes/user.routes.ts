import { User } from '../models/user';

const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
export const userRouter = express.Router();

userRouter.get('/', async (req, res, next) => {
  const users = await User.findAll()

  const responseObj = {
    status: 200,
    message: '성공',
    data: users,
  }

  res.status(200).json(responseObj)
})

userRouter.post('/login',
  passport.authenticate('local', { session: false }),
  function (req, res) {
    // `req.user`에 인증된 유저 객체가 저장

    /*
       token info
       secret Key : auth
       exp: 1day
     */
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
        sub: req.user.username,
        auth: 'ROLE_ADMIN,ROLE_USER'
      }, process.env.JWT_KEY,
      {
        algorithm: 'HS512'
      }
    )

    return res.json({ status: 200, message: '로그인 성공', token: token });
  }
);

userRouter.get('/auth/test',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    res.send(req.user)
  }
)