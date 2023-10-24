import axiosClient from './axiosClient';

const authApi = {
  signUp: (params) => {
    const url = '/api/v1/auth/register';
    return axiosClient.post(url, params);
  },
  logout: (params) => {
    const url = '/api/v1/auth/logout';
    return axiosClient.post(url, params);
  },
  login: (params) => {
    const url = '/api/v1/auth/authenticate';
    return axiosClient.post(url, params);
  },
};
export default authApi;
