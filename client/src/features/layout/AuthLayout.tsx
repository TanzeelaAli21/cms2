import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const AuthLayout: React.FC = () => {
    const navigate = useNavigate();
    React.useEffect(()=>{
        let token = localStorage.getItem('token');
        if(token !== undefined && token !== null){
          navigate('/');
        }
      },[])
    return (
        <>
        <Outlet />
        </>
    )
}

export default AuthLayout;
