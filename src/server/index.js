import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import models, { connectDb } from './models';
import routes from './routes';

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((request, response, next) => {
  request.context = {
    models,
    user: models.users.__id
  };
  next();
});

app.use('/api/session', routes.session);

const eraseDatabaseOnSync = true;

const seedDatabase = async () => {
  const user1 = new models.User({
    username: 'ToxicDescent'
  });

  const session1 = new models.Session({
    sessionTime: 10800,
    location: 'indoor',
    user: user1
  });

  const session2 = new models.Session({
    sessionTime: 7200,
    location: 'outdoor',
    user: user1
  });

  await session1.save();
  await session2.save();

  await user1.save();
};

connectDb().then(async () => {
  if (eraseDatabaseOnSync) {
    await Promise.all([
      models.User.deleteMany({}),
      models.Session.deleteMany({})
    ]);

    seedDatabase();
  }

  app.listen(process.env.PORT, () => {
    console.log(`Server listeng on port: ${process.env.PORT}`);
  });
});
