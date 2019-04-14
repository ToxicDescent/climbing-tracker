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

app.use(async (request, response, next) => {
  request.context = {
    models,
    user: await models.User.findByUsername('toxicdescent')
  };
  next();
});

app.use('/api/session', routes.session);

const eraseDatabaseOnSync = false;

const seedDatabase = async () => {
  const user1 = new models.User({
    username: 'toxicdescent'
  });
  const user2 = new models.User({
    username: 'mobberbom',
  });

  await user1.save();
  await user2.save();
};

connectDb().then(async () => {
  if (eraseDatabaseOnSync) {
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
