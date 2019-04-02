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

app.use(async (request, response, next) => {
  request.context = {
    models,
    user: await models.User.findByUsername('toxicdescent')
  };
  next();
});

app.use('/api/session', routes.session);

const eraseDatabaseOnSync = true;

const seedDatabase = async () => {
  const user1 = new models.User({
    username: 'toxicdescent',
    name: {
      first: 'Patrick',
      last: 'Haikal'
    }
  });

  const session1 = new models.Session({
    length: 10800,
    location: 'indoor',
    timestamp: new Date(),
    user: user1,
  });

  const climb1 = new models.Climb({
    grade: 'v1',
    flashed: 8,
    completed: 0,
    attempted: 0,
    session: session1
  });
  const climb2 = new models.Climb({
    grade: 'v2',
    flashed: 8,
    completed: 0,
    attempted: 0,
    session: session1
  });
  const climb3 = new models.Climb({
    grade: 'v3',
    flashed: 3,
    completed: 3,
    attempted: 5,
    session: session1
  });

  await climb1.save();
  await climb2.save();
  await climb3.save();

  await session1.save();

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

  app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server listeng on port: ${process.env.SERVER_PORT}`);
  });
});
