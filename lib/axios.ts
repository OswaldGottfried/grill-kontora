import axios from 'axios';

export const baseURL = 'https://joinposter.com/api';
export const token = '385421:2369748d639f5bf119c69639277af0f5';

const axiosClient = axios.create({
  baseURL,
  params: {
    token,
  },

  headers: {
    'Access-Control-Allow-Origin': baseURL,
    'Access-Control-Allow-Credentials': true,
  },
});

export default axiosClient;
