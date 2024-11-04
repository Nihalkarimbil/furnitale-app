import axios from 'axios';

const axiosinstance = axios.create({
    baseURL: 'http://localhost:5001/api', // Update with your backend base URL
});

// Function to refresh the access token
const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    console.log("Refreshing token with:", refreshToken);
    
    try {
        const response = await axios.post(`${axiosinstance.defaults.baseURL}/refresh-token`, { refreshToken });
        const newAccessToken = response.data.accessToken;

        // Update access token in local storage and axios headers
        localStorage.setItem('token', newAccessToken); // Ensure correct key is used
        axiosinstance.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`;
        
        console.log("New Access Token Set:", newAccessToken);
        return newAccessToken;
    } catch (error) {
        console.error("Error refreshing token:", error);
        throw error; // Rethrow to be caught in interceptor
    }
};

// Interceptor to catch 401 errors and refresh the token
axiosinstance.interceptors.response.use(
    response => {
        // Log response for debugging
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

                return axiosinstance(originalRequest); // Retry the original request
            } catch (refreshError) {
                console.error("Failed to refresh token:", refreshError);
                return Promise.reject(refreshError); // Do not retry if refresh token fails
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
