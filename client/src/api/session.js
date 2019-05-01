import { apiRequest } from './api';

// eslint-disable-next-line import/prefer-default-export
export const saveSession = sessionData => {
  apiRequest('/api/session', sessionData)
    .then(result => {
      return result;
    })
    .catch(error => {
      console.error(error);
      return null;
    });
};
