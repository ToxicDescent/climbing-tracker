import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import 'regenerator-runtime';

import models, { connectDb } from './models';
import controllers from './controllers';
import routes from './routes';

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(async (error, request, response, next) => {
  if (typeof error === 'string') {
    // custom application error
    return response.sendStatus(400).json({ message: error });
  }

  if (error.name === 'ValidationError') {
    // mongoose validation error
    return response.sendStatus(400).json({ message: error.message });
  }

  if (error.name === 'UnauthorizedError') {
    // jwt authentication error
    return response.sendStatus(401).json({ message: 'Invalid Token' });
  }

  return response.sendStatus(500).json({ message: error.message });
});

app.use(async (request, response, next) => {
  const token = request.header.authorization.split(' ')[1];
  const payload = jwt.verify(token, 'this is a secure secret');
  if (payload) {
    controllers.user.getByEmail(payload.email).then(async user => {
      request.context = {
        models,
        user
      };
      next();
    });
  } else {
    next();
  }
});

app.use('/api/user', routes.user);
app.use('/api/session', routes.session);

const eraseDatabaseOnSync = true;

const seedDatabase = async () => {
  const user1 = new models.User({
    email: 'pathaikal@gmail.com'
  });

  await user1.save();
};

connectDb().then(async () => {
  if (eraseDatabaseOnSync && process.env.NODE_ENV === 'development') {
    await Promise.all([
      models.User.deleteMany({}),
      models.Session.deleteMany({}),
      models.Boulder.deleteMany({}),
      models.Climb.deleteMany({})
    ]);

    seedDatabase();
  }

  app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server listeng on port: ${process.env.SERVER_PORT}`);
  });
});
