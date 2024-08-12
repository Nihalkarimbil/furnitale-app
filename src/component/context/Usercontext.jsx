import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export const UserContext = createContext();

const UserProvider = ({ children }) => {
    //set active user when user loggined 
    const stord = localStorage.getItem('activeuserdata')
    const [activeuser, setActivUser] = useState(stord ? JSON.parse(stord) : null);
    console.log(activeuser);
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
            const user = users.find(user => user.input.username === login.username && user.input.password === login.password);
            if (user) {
                localStorage.setItem('activeuserdata', JSON.stringify(user));
                setActivUser(user)
                navigate("/");
            } else {
                alert("Please check the username or password you have entered.");
            }
        } catch (error) {
            alert("An error occurred" + error.message);
        }
    };
    //logout function when user loged out the local storage data removed
    const handlelogout = async () => {
        localStorage.removeItem('activeuserdata');
        setActivUser(null)
    };

    return (
        <UserContext.Provider value={{ activeuser, handleSubmit, handlechange, login, userid: activeuser?.id, handlelogout }}>
            {children}
        </UserContext.Provider>
    );
}
export default UserProvider


