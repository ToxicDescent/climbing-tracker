import mongoose from 'mongoose';

import User from './user';
import Session from './session';
import Boulder from './boulder';
import Climb from './climb';

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, {
    useCreateIndex: true,
    useNewUrlParser: true
  });
};

const models = { User, Session, Boulder, Climb };

export { connectDb };

export default models;
