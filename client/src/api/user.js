import { apiRequest } from './api';

export const loginUser = userDetails => {
  return apiRequest('/api/user/login', userDetails);
};

export const createUser = userDetails => {
  return apiRequest('/api/user/create', userDetails);
};
