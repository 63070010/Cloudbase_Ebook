import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://5ixfubta0m.execute-api.us-east-1.amazonaws.com',
    withCredentials: true
})

instance.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default instance
