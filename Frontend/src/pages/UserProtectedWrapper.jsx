import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/userContext.jsx';
import axios from 'axios';
import UberLoader from '../components/UberLoader.jsx';

const UserProtectedWrapper = ({children}) => {

    const token = localStorage.getItem('token');
    const { user, setUser } = React.useContext(UserDataContext);
    const [isLoading, setIsLoading] = React.useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if(!token){
            navigate('/login');
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response)=>{
      setUser(response.data);
      setIsLoading(false);
    }).catch((error) => {
      console.error(error);
      localStorage.removeItem('token');
      navigate('/login');
    })
    }, [token, navigate, setUser]);

    if(isLoading){
      return <UberLoader />;
    }
  return <div>{children}</div>
}

export default UserProtectedWrapper
