import axios from 'axios'

const apiUrl = 'http://127.0.0.1:8000/api';

const api = axios.create({
    baseURL: apiUrl,
    headers: {
        "Content-type": "application/json"
    }
});

const publicApi = ['/events']

api.interceptors.request.use((config) =>{
    const token = localStorage.getItem("apiToken");

    if(token && !publicApi.includes(config.url)){
        config.headers = {Authorization: `Bearer ${token}`}
    }

    return config;
})

export default api;