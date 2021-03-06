import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import models from '../models';

export const authenticateUser = async userDetails => {
  const user = await models.User.findOne({ email: userDetails.email });
  if (user && bcrypt.compareSync(userDetails.password, user.hash)) {
    const { hash, ...userWithoutHash } = user.toObject();
    const token = jwt.sign({ sub: user.id }, 'this is a secure secret');
    return {
      ...userWithoutHash,
      token
    };
  }
};

export const getAllUsers = async () => {
  return await models.User.find().select('-hash');
};

export const getUserById = async id => {
  return await models.User.findById(id).select('-hash');
};

export const getUserByEmail = async email => {
  return await models.User.findOne({ email }).select('-hash');
};

export const createUser = async userDetails => {
  // validate
  if (await getByEmail(userDetails.email)) {
    throw 'Email is registered to a user';
  }

  const user = new models.User(userDetails);

  // hash password
  if (userDetails.password) {
    user.hash = bcrypt.hashSync(userDetails.password, 10);
  }

  // save user
  await user.save();
};

export const updateUser = async (id, userDetails) => {
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
    userDetails.hash = bcrypt.hashSync(userDetails.password, 10);
  }

  // copy userDetails to user
  Object.assign(user, userDetails);

  await user.save();
};

const _deleteUser = async id => {
  await models.User.findByIdAndRemove(id);
};
