import mongoose from 'mongoose';

import User from './user';
import Session from './session';

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
};

const models = { User, Session };

export { connectDb };

export default models;
