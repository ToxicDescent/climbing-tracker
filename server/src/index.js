import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import 'regenerator-runtime';

import models, { connectDb } from './models';
import routes from './routes';

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
