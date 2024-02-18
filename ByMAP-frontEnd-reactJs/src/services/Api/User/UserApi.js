import { axiosClient } from "../../../api/axios.js";

const UserApi = {
  login: async (email, password) => {
    return await axiosClient.post('/login', { email, password });
  },
  logout: async () => {
    return await axiosClient.post('/logout');
  },
  getUser: async (role) => {
    return await axiosClient.get(`/${role}`);
  },
};

export default UserApi;