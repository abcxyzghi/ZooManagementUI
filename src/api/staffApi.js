import axiosClient from './axiosClient';

const staffApi = {
  getAllStaff: () => {
    return axiosClient.get('/api/v1/staff');
  },
};
export default staffApi;
