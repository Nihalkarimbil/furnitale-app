import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosinstance from '../axiosinstance';


export const UserContext = createContext();

const UserProvider = ({ children }) => {
  
    const ad = localStorage.getItem('adminData')
    const [isadmin, setIsadmin] = useState(ad ? JSON.parse(ad) : null) 
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
    
                if (userData.blocked) {
                    toast.error("Your account is blocked");
                    return;
                }
            
                localStorage.setItem('token', userData.token); 
                localStorage.setItem('refreshToken', userData.refreshToken); 
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
    
    
    const handlelogout = async () => {
        try {
            await axiosinstance.post('/user/logout', {
                withCredentials: true,
            });
            setActivUser(null);
            localStorage.removeItem('activeuserdata');
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');

            
          
            toast.success('Logout successfully');
        } catch (error) {
            toast.error('Logout failed');
        }
    };
    


const addminlogout = async () => {
    try {

        await axiosinstance.post('/user/logout', {
            withCredentials: true, 
        });

        setIsadmin(null);
        localStorage.removeItem('adminData');
        localStorage.removeItem('token');
        
     
        
        navigate('/');

        toast.success('Admin logout successfully');
    } catch (error) {
      
        toast.error('Admin logout failed');
    }
}

    return (
        <UserContext.Provider value={{ setActivUser, activeuser, handleSubmit, handlechange, login, userid: activeuser?.id, handlelogout, isadmin, addminlogout }}>
            {children}
        </UserContext.Provider>
    );
}
export default UserProvider


