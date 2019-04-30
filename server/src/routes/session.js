import { Router } from 'express';

import { wrapAsync } from '../middleware/wrapAsync';
import { getUserByEmail } from '../controllers/user';
import { authoriseUser } from '../middleware/authoriseUser';

const router = Router();

router.post(
  '/',
  authoriseUser,
  wrapAsync(async (request, response) => {
    const user = await getUserByEmail(request.body.email);
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
      return response.status(200);
    }

    const error = new Error('User not found');
    error.httpStatusCode = 401;
    throw error;
  })
);

export default router;
