import { apiRequest } from './api';

// eslint-disable-next-line import/prefer-default-export
export const saveSession = sessionData => {
  return apiRequest('/api/session', sessionData);
};
