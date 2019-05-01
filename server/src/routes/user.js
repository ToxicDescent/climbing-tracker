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
    const user = await getUserByEmailWithHash(request.body.email);
    const authenticated = bcrypt.compareSync(request.body.password, user.hash);

    if (!user || !authenticated) {
      throw createError('Email or password is incorrect', 400);
    }

    jwt.sign({ userId: user.id }, 'this is a secure secret', (error, token) => {
      if (error) {
        throw createError('Failed to sign token', 400);
      }
      response
        .cookie('userToken', token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24
        })
        .json({ name: user.name });
    });
  })
);

router.post(
  '/signup',
  wrapAsync(async (request, response) => {
    if (await getUserByEmail(request.body.email)) {
      throw createError(
        `Email (${request.body.email}) is registered to another user`,
        400
      );
    }

    const user = new models.User(request.body);

    if (request.body.password) {
      user.hash = bcrypt.hashSync(request.body.password, 10);
    }

    await user.save();
  })
);

export default router;
