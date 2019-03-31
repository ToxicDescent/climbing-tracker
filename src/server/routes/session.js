import { Router } from 'express';

const router = Router();

router.post('/', async (request, response) => {
  const { username } = request.body;
  const user = await request.context.models.User.findOne({
    username
  });
  if (user.id === request.context.user.id) {
    return response.sendStatus(200);
  }
  return response.sendStatus(401);
});

router.get('/last', (request, response) => {
  const { userId } = request.body;
  if (userId === request.context.user.id) {
    return response.send(request.context.models.sessions[1]);
  }
  return response.sendStatus(401);
});

export default router;
