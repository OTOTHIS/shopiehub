import {axiosClient} from "../../api/axios.js";

const MagazinApi = {
  create: async (payload) => {
    return await axiosClient.post('/owner/magazins', payload);
  },
  all: async () => {
    return await axiosClient.get('/owner/magazins');
  },
  get: async (id) => {
    return await axiosClient.get(`/owner/magazins/${id}`);
  },
  update: async (id, payload) => {
    return await axiosClient.put(`/owner/magazins/${id}`, payload);
  },
  delete: async (id) => {
    return await axiosClient.delete(`/owner/magazins/${id}`);
  },
  getPoducts: async (id) => {
    return await axiosClient.get(`/owner/magazin/${id}/products`);
  },
};

export default MagazinApi;
