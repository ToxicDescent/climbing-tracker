import { Router } from 'express';
import bcrypt from 'bcryptjs';

import { wrapAsync } from '../middleware/wrapAsync';
import { authenticateUser } from '../controllers/user';
import { createError } from '../utility/createError';
import models from '../models';

const router = Router();

router.post(
  '/login',
  wrapAsync(async (request, response) => {
    const authenticatedUser = await authenticateUser(request.body);
    if (authenticatedUser) {
      response.json(authenticatedUser);
    }
    throw createError('Email or password is incorrect', 400);
  })
);

const getUserByEmail = async email => {
  return await models.User.findOne({ email }).select('-hash');
};

router.post(
  '/signup',
  wrapAsync(async (request, response) => {
    // validate
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
