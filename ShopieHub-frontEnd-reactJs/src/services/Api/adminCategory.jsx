import {axiosClient} from "../../api/axios.js";

const adminCategoryApi = {
  create: async (payload) => {
    return await axiosClient.post('/categories', payload);
  },
  all: async () => {
    return await axiosClient.get('/categories');
  },
  get: async (id) => {
    return await axiosClient.get(`/categories/${id}`);
  },
  update: async (id, payload) => {
    return await axiosClient.put(`/categories/${id}`, payload);
  },
  delete: async (id) => {
    return await axiosClient.delete(`/categories/${id}`);
  },

};

export default adminCategoryApi;
