import { Router } from 'express';

const router = Router();

router.post('/', async (request, response) => {
  const user = await request.context.models.User.findByUsername(
    request.body.username
  );
  if (user.id === request.context.user.id) {
    const session = await request.context.models.Session.create({
      location: request.body.session.location,
      length: request.body.session.sessionTime,
      timestamp: new Date(),
      user: user.id
    });
    request.body.session.climbs.forEach(async climb => {
      await request.context.models.Climb.create({
        grade: climb.grade,
        flashed: climb.flashed,
        completed: climb.completed,
        attempted: climb.attempted,
        session: session.id
      });
    });
    return response.sendStatus(200);
  }
  return response.sendStatus(401);
});

router.get('/last', async (request, response) => {
  const user = await request.context.models.User.findByUsername(
    request.body.username
  );
  console.error(user);
  if (user.id === request.context.user.id) {
    const session = await request.context.models.Session.find({
      user
    })
      .sort({ timestamp: 'descending' })
      .limit(1);
    console.error(session);
    const climbs = await request.context.models.Climb.find({
      session
    });
    console.error(climbs);
    const data = {
      ...session,
      climbs: {
        ...climbs
      }
    };
    console.error(data);
    return response.send(data);
  }
  return response.sendStatus(401);
});

export default router;
