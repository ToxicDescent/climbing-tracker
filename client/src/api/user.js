import { apiRequest } from './api';

export const loginUser = userDetails => {
  return apiRequest('/api/user/login', userDetails);
};

export const signupUser = userDetails => {
  return apiRequest('/api/user/signup', userDetails);
};
