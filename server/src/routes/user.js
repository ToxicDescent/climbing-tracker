import { Router } from 'express';

import { authenticateUser } from '../controllers/user';

const router = Router();

router.post('/login', async (request, response) => {
  const authenticatedUser = await authenticateUser(
    request.body.email,
    request.body.password
  );
  if (authenticatedUser) {
    response.json(authenticatedUser);
  }
  response.status(400).json({ message: 'Email or password is incorrect' });
});

export default router;
