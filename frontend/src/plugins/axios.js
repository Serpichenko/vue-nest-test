import axios from 'axios'

async function onRequest(config) {
  console.log(config);
  return config;
}

function onResponse(response) {
  console.log(response);
  return response;
}

function onError(error) {
  console.log(error)
  return Promise.reject(error)
}

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

axios.interceptors.request.use(onRequest)
axios.interceptors.response.use(onResponse, onError)
export default axios;