import axiosClient from './axiosClient';

const cusomterApi = {
  getList: () => {
    const url = '/demo20/api/v1/customers';
    return axiosClient.get(url);
  },
};
export default cusomterApi;
