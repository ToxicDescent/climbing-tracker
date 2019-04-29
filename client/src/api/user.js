import { getServerUrl } from '../environment/environment';

export const loginUser = (email, password) => {
  fetch(`${getServerUrl()}/api/user/login`, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
    body: JSON.stringify({
      email,
      password
    })
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not OK.');
    })
    .catch(error => {
      console.log(
        'There has been a problem with your fetch operation: ',
        error.message
      );
    });
};

export const createUser = userDetails => {
  fetch(`${getServerUrl()}/api/user/create`, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(userDetails)
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not OK.');
    })
    .catch(error => {
      console.log(
        'There has been a problem with your fetch operation: ',
        error.message
      );
    });
};
