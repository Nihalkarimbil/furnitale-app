import axios from 'axios';

const axiosinstance = axios.create({
    baseURL: 'https://funitale-backend.onrender.com/api', 
});


const refreshToken = async () => {
    const refreshtoken = localStorage.getItem('refreshToken');
    console.log("Refreshing token with:", refreshToken);
    
    try {
        const response = await axios.post(`${axiosinstance.defaults.baseURL}/refresh-token`, { refreshtoken });
        const newAccessToken = response.data.accessToken;

        axiosinstance.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`;
        
        console.log("New Access Token Set:", newAccessToken);
        return newAccessToken;
    } catch (error) {
        console.error("Error refreshing token:", error);
        throw error; 
    }
};


axiosinstance.interceptors.response.use(
    response => {
     
        console.log("Response:", response);
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            console.log("401 error caught, attempting to refresh token.");

            try {
                const newAccessToken = await refreshToken();
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                console.log("Retrying original request with new token.");

                return axiosinstance(originalRequest); 
            } catch (refreshError) {
                console.error("Failed to refresh token:", refreshError);
                return Promise.reject(refreshError); 
            }
        }

        console.error("Error in response:", error);
        return Promise.reject(error);
    }
);

// Set initial Authorization header if token exists
const initialToken = localStorage.getItem('token');
if (initialToken) {
    axiosinstance.defaults.headers['Authorization'] = `Bearer ${initialToken}`;
}

export default axiosinstance;
