import axios from 'axios'

const axiosinstance = axios.create({
    baseURL: "http://localhost:5001/api"
})

axiosinstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)


export default axiosinstance