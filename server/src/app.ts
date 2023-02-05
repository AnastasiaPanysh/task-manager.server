import express, { Request, Response, NextFunction } from 'express';
import user from './controller/user.controller';
import task from './controller/task.controller';
import auth from './controller/auth.controller';
import bodyParser from 'body-parser';

const app = express();

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.use(bodyParser.json());

app.use('/user', user);
app.use('/task', task);
app.use('/api', auth);

app.use(function (error, req: Request, res: Response, next: NextFunction) {
  res.status(500).send(error.message);
});

export default app;
