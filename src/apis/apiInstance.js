import axios from 'axios';

const baseApiURL = import.meta.env.VITE_BASE_API;

function urlCreator(url) {
  return `${baseApiURL}/${url}`;
}

export const getData = (url, config) => {
  return axios.get(urlCreator(url), config);
};

export const postData = (url, data, config) => {
  return axios.post(urlCreator(url), data, config);
};

