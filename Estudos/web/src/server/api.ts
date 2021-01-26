import axios from 'axios'

const api = axios.create({

    baseURL: 'http://localhost:666'
});

export default api;