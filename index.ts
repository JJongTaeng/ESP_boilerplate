import * as express from "express";
import { config } from 'dotenv';
import { userRouter } from './routes/user.routes';

const morgan = require('morgan');
const sequelize = require('./models/index')
const passport = require('passport');
const passportConfig = require('./passport');

config(); // env 환경 설정

const app: express.Application = express();

app.use(
  (req, res, next) => {
    if(process.env.NODE_ENV === 'production') {
      morgan('combined')(req, res, next);
    } else {
      morgan('dev')(req, res, next);
    }
  },
  express.json(),
  express.urlencoded({ extended: false})
);

sequelize.sync({ force: false })
  .then( async () => {
    console.log('데이터베이스 연결 성공')
  })
  .catch((err) => {
    console.error(err);
  })

passportConfig();
app.use(passport.initialize());

app.use('/api/user', userRouter);

app.listen(process.env.PORT, () => {
  console.log('### Server Start : http://localhost:3000');
})