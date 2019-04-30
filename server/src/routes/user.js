import { Router } from 'express';

import { wrapAsync } from '../middleware/wrapAsync';
import { authenticateUser } from '../controllers/user';
import { createError } from '../utility/createError';

const router = Router();

router.post(
  '/login',
  wrapAsync(async (request, response) => {
    const authenticatedUser = await authenticateUser(
      request.body.email,
      request.body.password
    );
    if (authenticatedUser) {
      response.json(authenticatedUser);
    }
    throw createError('Email or password is incorrect', 400);
  })
);

export default router;
