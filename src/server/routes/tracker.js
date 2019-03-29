import { Router } from 'express';

const router = Router();

router.post('/', (request, response) => {
  const { userId } = request.body;
  response.send(`UserId: ${userId}`);
});

export default router;
