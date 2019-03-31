import { Router } from 'express';

const router = Router();

router.post('/', async (request, response) => {
  const user = await request.context.models.User.findByUsername(
    request.body.username
  );
  if (user._id.equals(request.context.user._id)) {
    await request.context.models.Session.create({
      location: request.body.session.location,
      length: request.body.session.length,
      timestamp: new Date(),
      user: user._id,
      climbs: request.body.session.climbs
    });
    return response.sendStatus(200);
  }
  return response.sendStatus(401);
});

router.get('/last', async (request, response) => {
  const user = await request.context.models.User.findByUsername(
    request.body.username
  );
  if (user._id.equals(request.context.user._id)) {
    const session = await request.context.models.Session.find({
      user
    })
      .sort({ timestamp: 'descending' })
      .limit(1);
    return response.send(session);
  }
  return response.sendStatus(401);
});

export default router;
