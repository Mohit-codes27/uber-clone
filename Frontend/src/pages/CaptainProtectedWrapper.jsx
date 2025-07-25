import React, { useState } from 'react'
import { useEffect } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import UberLoader from '../components/UberLoader.jsx';

const CaptainProtectedWrapper = ({ children }) => {

    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const { captain, setCaptain } = React.useContext(CaptainDataContext);
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        if (!token) {
            navigate('/captain-login');
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }).then((response) =>{
        if (response.status === 200) {
            setCaptain(response.data.captain);
            setIsLoading(false);
        }
    }).catch((error) => {
        console.log(error);
        localStorage.removeItem('token');
        navigate('/captain-login');
    })
    }, [token, navigate, setCaptain]);

    

    if(isLoading){
    return <UberLoader />;
  }

    return (
        <div>
            {children}
        </div>
    )


}

export default CaptainProtectedWrapper
