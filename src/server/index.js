import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import routes from './routes';

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/tracker', routes.tracker);

app.get('/', (request, response) => {
  response.send('Hello World!');
});

app.listen(process.env.PORT, () => {
  console.log(`Server listeng on port: ${process.env.PORT}`);
});
