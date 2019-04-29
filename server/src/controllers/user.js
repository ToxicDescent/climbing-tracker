import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import models from '../models';

const authenticate = async (email, password) => {
  const user = await models.User.findByEmail(email);
  if (user && bcrypt.compareSync(password, user.hash)) {
    const { hash, ...userWithoutHash } = user.toObject();
    const token = jwt.sign({ sub: user.id }, 'this is a secure secret');
    return {
      ...userWithoutHash,
      token
    };
  }
};

const getAll = async () => {
  return await models.User.find().select('-hash');
};

const getById = async id => {
  return await models.User.findById(id).select('-hash');
};

const getByEmail = async email => {
  return await models.User.findOne({ email }).select('-hash');
};

const create = async userDetails => {
  // validate
  if (await getByEmail(userDetails.email)) {
    throw 'Email is registered to a user';
  }

  const user = new models.User(userDetails);

  // hash password
  if (userDetails.password) {
    user.hash = bcrypt.hashSync(userDetails.password, 15);
  }

  // save user
  await user.save();
};

const update = async (id, userDetails) => {
  const user = await getById(id);

  // validate
  if (!user) throw 'User not found';
  if (
    user.email !== userDetails.email &&
    (await models.User.findOne({ email: userDetails.email }))
  ) {
    throw 'Email is registered to a user';
  }

  // hash password
  if (userDetails.password) {
    userDetails.hash = bcrypt.hashSync(userDetails.password, 15);
  }

  // copy userDetails to user
  Object.assign(user, userDetails);

  await user.save();
};

const _delete = async id => {
  await models.User.findByIdAndRemove(id);
};

export default {
  authenticate,
  getAll,
  getById,
  getByEmail,
  create,
  update
};
