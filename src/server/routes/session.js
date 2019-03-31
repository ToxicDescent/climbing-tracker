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

router.get('/last', async (request, response) => {
  const { username } = request.body;
  const user = await request.context.models.User.findOne({
    username
  });
  if (user.id === request.context.user.id) {
    const sessions = await request.context.models.Session.find({
      user
    });
    return response.send(sessions[0]);
  }
  return response.sendStatus(401);
});

export default router;
