import axios from "axios";

const URL = "http://127.0.0.1:8000/api"
const NODE_URL = "http://127.0.0.1:9900/api"
const axiosClient = axios.create({
  baseURL:URL,
  withCredentials: true,
})

axiosClient.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
})

export {axiosClient,URL,NODE_URL}
