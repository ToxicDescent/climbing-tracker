import { Router } from 'express';

import { wrapAsync } from '../middleware/wrapAsync';
import { authenticateUser } from '../controllers/user';

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
    const error = new Error('Email or password is incorrect');
    error.httpStatusCode = 400;
    throw error;
  })
);

export default router;
