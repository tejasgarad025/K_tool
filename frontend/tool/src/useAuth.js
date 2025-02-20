import { useState, useEffect } from 'react';
import axiosInstance from './axiosConfig'; 

const useAuth = () => {
    const [user, setUser] = useState(null);
    const token = localStorage.getItem("Token");

    useEffect(() => {
        if (token) {
            axiosInstance.get("user/")
            .then(response => setUser(response.data))
            .catch(error => {
                    console.log("Error fetching user:", error.response ? error.response.data : error);
                    setUser(null); 
                });
        } else {
            setUser(null);
        }
    }, [token]);

    return user;
};

export default useAuth;