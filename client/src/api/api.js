import { getServerUrl } from '../environment/environment';

// eslint-disable-next-line import/prefer-default-export
export const apiRequest = (url, body) => {
  fetch(`${getServerUrl()}${url}`, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(body)
  }).then(response => {
    if (!response.ok) {
      throw new Error(
        `Api request failed with: ${response.status} - ${response.statusText}`
      );
    }
    return response.json();
  });
};
