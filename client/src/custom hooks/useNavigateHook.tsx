import React from 'react'
import { useNavigate } from 'react-router-dom';
const useNavigateHook = (url: string) => {
    console.log(url);
    const navigate = useNavigate();
    navigate(url);
}

export default useNavigateHook;