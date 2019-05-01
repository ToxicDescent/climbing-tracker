import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { wrapAsync } from '../middleware/wrapAsync';
import { createError } from '../utility/createError';
import models from '../models';

const router = Router();

const getUserByEmail = async email => {
  return await models.User.findOne({ email }).select('-hash');
};
const getUserByEmailWithHash = async email => {
  return await models.User.findOne({ email });
};

router.post(
  '/login',
  wrapAsync(async (request, response) => {
    // find user via email
    const userWithHash = await getUserByEmailWithHash(request.body.email);
    // validate password
    if (
      !userWithHash ||
      !bcrypt.compareSync(request.body.password, userWithHash.hash)
    ) {
      throw createError('Email or password is incorrect', 400);
    }
    const { hash, ...userWithoutHash } = userWithHash.toObject();
    // create jwt
    jwt.sign(
      { sub: userWithHash.id },
      'this is a secure secret',
      (error, token) => {
        if (error) {
          throw createError('Failed to sign token', 400);
        }
        response.json({ ...userWithoutHash, token });
      }
    );
  })
);

router.post(
  '/signup',
  wrapAsync(async (request, response) => {
    // validate doesn't exist
    if (await getUserByEmail(request.body.email)) {
      throw createError(
        `Email (${request.body.email}) is registered to another user`,
        400
      );
    }
    const user = new models.User(request.body);
    // hash password
    if (request.body.password) {
      user.hash = bcrypt.hashSync(request.body.password, 10);
    }
    // save user
    await user.save();
  })
);

export default router;
