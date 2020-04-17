import axios from 'axios'

const api = axios.create({
  baseURL: 'http://www.omdbapi.com/',
  apikey: 'b43a5e5'
})

export default api;
