import jwt from 'jsonwebtoken';

import { getUserById } from '../controllers/user';

export const authoriseUser = async (request, response, next) => {
  let token =
    request.headers['x-access-token'] || request.headers['authorization'];

  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  if (!token) {
    return response.status(401).send('No token provided.');
  }

  jwt.verify(token, 'this is a secure secret', (error, decoded) => {
    if (error) {
      return response.status(400).send('Invalid token');
    }
    const user = getUserById(decoded.id);
    request.context = {
      models,
      user
    };

    next();
  });
};
