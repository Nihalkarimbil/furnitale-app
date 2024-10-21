import React, { createContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



export const UserContext = createContext();

const UserProvider = ({ children }) => {
    
    //set admin when admin loged in
    const ad=localStorage.getItem('adminData')
   const [isadmin,setIsadmin]=useState(ad? JSON.parse(ad):null)
    //set active user when user loggined 
    const stord = localStorage.getItem('activeuserdata')
    const [activeuser, setActivUser] = useState(stord ? JSON.parse(stord) : null);
   
    //
    //login page setup functions 
    const [login, setLogin] = useState({
        username: ' ',
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
            const res = await axios.get("http://localhost:5000/user");
            const users = res.data;
            const user = users.find(user => user.username === login.username && user.password === login.password&&user.admin==false&& user.blocked==false);
            const admin= users.find(user=>user.username===login.username&&user.password===login.password&&user.admin==true)
            
            if (user) {
                localStorage.setItem('activeuserdata', JSON.stringify(user));
                setActivUser(user)
                navigate("/");
                toast.success('user logged in')
            } else if (admin) {
                setIsadmin(admin)
                localStorage.setItem('adminData', JSON.stringify(admin));
                navigate('/admin')
            } else {
                toast.error("Please check the username or password you have entered.");
            }
        } catch (error) {
            toast.error("An error occurred" + error.message);
        }
    };
    //logout function when user loged out the local storage data removed
    const handlelogout = async () => {
        localStorage.removeItem('activeuserdata');
        setActivUser(null)
        toast.success('logout succesfully')
    };

    const addminlogout= async()=>{
        localStorage.removeItem('adminData')
        setIsadmin(null)
        navigate('/')
    }

    return (
        <UserContext.Provider value={{setActivUser, activeuser, handleSubmit, handlechange, login, userid: activeuser?.id, handlelogout,isadmin ,addminlogout }}>
            {children}
        </UserContext.Provider>
    );
}
export default UserProvider


