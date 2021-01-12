import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://joinposter.com/api',
  params: {
    token: process.env.TOKEN,
  },
});

export default axiosClient;
