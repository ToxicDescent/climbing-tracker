import { apiRequest } from './api';

export const loginUser = userDetails => {
  apiRequest('/api/user/login', userDetails)
    .then(result => {
      return result;
    })
    .catch(error => {
      console.error(error);
      return null;
    });
};

export const signupUser = userDetails => {
  apiRequest('/api/user/signup', userDetails)
    .then(result => {
      return result;
    })
    .catch(error => {
      console.error(error);
      return null;
    });
};
