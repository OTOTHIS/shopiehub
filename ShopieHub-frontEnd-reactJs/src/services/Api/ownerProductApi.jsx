import { axiosClient } from "../../api/axios";


const OwnerProductApi = {
    create: async (payload) => {
      return await axiosClient.post('/owner/products', payload);
    },
    all: async () => {
      return await axiosClient.get('/owner/products');
    },
    get: async (id) => {
      return await axiosClient.get(`/owner/products/${id}`);
    },
    update: async (id, payload) => {
      return await axiosClient.put(`/owner/products/${id}`, payload);
    },
    delete: async (id) => {
      return await axiosClient.delete(`/owner/products/${id}`);
    },
 
  };

export default OwnerProductApi ;