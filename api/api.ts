import Axios from 'axios';

const api =
  typeof window === 'undefined'
    ? Axios.create({
        baseURL: process.env.NEXT_PUBLIC_BUKCY_BASE_END_POINT || '',
        withCredentials: true,
      })
    : Axios.create({
        baseURL: undefined,
        withCredentials: true,
      });

export default api;
