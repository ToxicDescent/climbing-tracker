import { Router } from 'express';

import controllers from '../controllers';

const router = Router();

router.post('/login', async (request, response) => {
  const authenticatedUser = await controllers.user.authenticate(
    request.body.email,
    request.body.password
  );
  if (authenticatedUser) {
    response.json(authenticatedUser);
  }
  response.sendStatus(400).json({ message: 'Email or password is incorrect' });
});

export default router;
