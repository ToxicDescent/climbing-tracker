import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import models from './models';
import routes from './routes';

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((request, response, next) => {
  request.context = {
    models,
    user: models.users[1]
  };
  next();
});

app.use('/api/session', routes.session);

app.get('/', (request, response) => {
  response.send('Hello World!');
});

app.listen(process.env.PORT, () => {
  console.log(`Server listeng on port: ${process.env.PORT}`);
});
