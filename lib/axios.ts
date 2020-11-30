import axios from 'axios';

export const baseURL = 'https://joinposter.com/api';

const axiosClient = axios.create({
  baseURL,
  params: {
    token: process.env.TOKEN,
  },

  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    'Access-Control-Allow-Headers': 'Content-Type',
  },
});

export default axiosClient;
