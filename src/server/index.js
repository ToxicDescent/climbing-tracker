import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.get('/', (request, response) => {
  response.send('Hello World!');
});

app.listen(process.env.PORT, () => {
  console.log(`Server listeng on port: ${process.env.PORT}`);
});
