import {axiosClient} from "../../api/axios.js";


const OwnerApi = {
  create: async (payload) => {
    return await axiosClient.post('/admin/owners', payload)
  },
  all: async () => {
    return await axiosClient.get('/admin/owners')
  },
}

export default OwnerApi
