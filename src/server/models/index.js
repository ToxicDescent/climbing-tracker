import mongoose from 'mongoose';

import User from './user';
import Session from './session';
import Climb from './climb';

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
};

const models = { User, Session, Climb };

export { connectDb };

export default models;
