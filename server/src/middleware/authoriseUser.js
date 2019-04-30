import jwt from 'jsonwebtoken';

import { getUserById } from '../controllers/user';

export const authoriseUser = (request, response, next) => {
  let token =
    request.headers['x-access-token'] || request.headers['authorization'];

  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  if (!token) {
    const error = new Error('No token provided');
    error.httpStatusCode = 401;
    return next(error);
  }

  jwt.verify(token, 'this is a secure secret', (error, decoded) => {
    if (error) {
      const error = new Error('Invalid token');
      error.httpStatusCode = 400;
      return next(error);
    }
    const user = getUserById(decoded.id);
    request.context = {
      models,
      user
    };

    next();
  });
};
