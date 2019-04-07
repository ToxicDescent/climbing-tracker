import { Router } from 'express';

const router = Router();

router.post('/', async (request, response) => {
  const user = await request.context.models.User.findByUsername(
    request.body.username
  );
  if (user._id.equals(request.context.user._id)) {
    const session = await request.context.models.Session.create({
      location: request.body.session.location,
      length: request.body.session.length,
      timestamp: new Date(),
      user: user._id
    });
    request.body.session.boulders.forEach(async boulder => {
      await request.context.models.Boulder.create({
        ...boulder,
        session: session._id
      });
    });
    request.body.session.climbs.forEach(async climb => {
      await request.context.models.Climb.create({
        ...climb,
        session: session._id
      });
    });
    return response.sendStatus(200);
  }
  return response.sendStatus(401);
});

export default router;
