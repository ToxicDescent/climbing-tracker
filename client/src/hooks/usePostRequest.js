import { useState, useEffect, useReducer } from 'react';
import axios from 'axios';

import { getServerUrl } from '../environment/environment';

const responseReducer = (state, action) => {
  switch (action.type) {
    case 'POST_REQUEST':
      return { ...state, isLoading: true };
    case 'POST_REQUEST_SUCCESS':
      return { ...state, isLoading: false, data: action.data };
    case 'POST_REQUEST_FAILURE':
      return { ...state, isLoading: false, error: action.error };
    default:
      return state;
  }
};

const usePostRequest = (url) => {
  const [body, setBody] = useState(null);
  const [state, dispatch] = useReducer(responseReducer, {
    isLoading: false,
    data: null,
    error: null
  });

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      dispatch({ type: 'POST_REQUEST' });

      await axios
        .post(`${getServerUrl()}${url}`, body, {
          cancelToken: source.token
        })
        .then(response => {
          dispatch({ type: 'POST_REQUEST_SUCCESS', data: response.data });
        })
        .catch(error => {
          dispatch({ type: 'POST_REQUEST_FAILURE', error });
        });
    };

    fetchData();

    return () => {
      source.cancel();
    };
  }, [body]);

  return [state, setBody];
};

export default usePostRequest;
