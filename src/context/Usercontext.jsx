import React, { createContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosinstance from '../axiosinstance';


export const UserContext = createContext();

const UserProvider = ({ children }) => {

    //set admin when admin loged in
    const ad = localStorage.getItem('adminData')
    const [isadmin, setIsadmin] = useState(ad ? JSON.parse(ad) : null)
    //set active user when user loggined 
    const stord = localStorage.getItem('activeuserdata')
    const [activeuser, setActivUser] = useState(stord ? JSON.parse(stord) : null);

    //
    //login page setup functions 
    const [login, setLogin] = useState({
        username: '',
        password: ""
    })
    const navigate = useNavigate()
    const handlechange = (e) => {
        const { name, value } = e.target;
        setLogin({ ...login, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const res = await axiosinstance.post("/user/login", {
                username: login.username,
                password: login.password,
            }, { withCredentials: true });
    
            if (res.status === 200) {
                const userData = res.data;
    
                // Check if user is blocked
                if (userData.blocked) {
                    toast.error("Your account is blocked");
                    return;
                }
                
                // Store tokens in local storage
                localStorage.setItem('token', userData.token); // Store access token
                localStorage.setItem('refreshToken', userData.refreshToken); // Store refresh token
                console.log('aaaaa',userData);
                
                if (userData.admin) {
                    // Admin login
                    setIsadmin(userData);
                    localStorage.setItem('adminData', JSON.stringify(userData));
                    navigate('/admin');
                    toast.success('Admin logged in');
                } else {
                    // User login
                    setActivUser(userData);
                    localStorage.setItem('activeuserdata', JSON.stringify(userData));
                    navigate("/");
                    toast.success('User logged in');
                }
            } else {
                toast.error("Please check the username or password you have entered.");
            }
        } catch (error) {
            console.error("Error during login:", error);
            toast.error("An error occurred. Please try again.");
        }
    };
    
    
    //logout function when user loged out the local storage data removed
    const handlelogout = async () => {
        localStorage.removeItem('activeuserdata');
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        setActivUser(null)
        toast.success('logout succesfully')
    };

    const addminlogout = async () => {
        localStorage.removeItem('adminData')
        localStorage.removeItem('token')
        setIsadmin(null)
        navigate('/')
    }

    return (
        <UserContext.Provider value={{ setActivUser, activeuser, handleSubmit, handlechange, login, userid: activeuser?.id, handlelogout, isadmin, addminlogout }}>
            {children}
        </UserContext.Provider>
    );
}
export default UserProvider

