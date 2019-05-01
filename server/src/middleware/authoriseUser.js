import jwt from 'jsonwebtoken';

import { getUserById } from '../controllers/user';
import { createError } from '../utility/createError';

export const authoriseUser = (request, response, next) => {
  let token =
    request.headers['x-access-token'] || request.headers['authorization'];

  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  if (!token) {
    return next(createError('No token provided', 401));
  }

  jwt.verify(token, 'this is a secure secret', (error, decoded) => {
    if (error) {
      return next(createError('Invalid token', 400));
    }
    const user = getUserById(decoded.userId);
    request.context = {
      models,
      user
    };

    next();
  });
};
