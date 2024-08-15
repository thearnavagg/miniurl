import { UrlState } from '@/context/UrlContext';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BarLoader } from 'react-spinners';

function ProtectedRouter({children}){
    const navigate = useNavigate();
    const {loading, isAuthenticated} = UrlState();

    useEffect(() => {
        if(!isAuthenticated && loading == false) navigate("/auth");
    },[isAuthenticated,loading]);

    if(loading) return (
    <BarLoader className="mb-4" width={"100%"} color="#2f22f2"/>
    );

    if (isAuthenticated) return children;
}

export default ProtectedRouter