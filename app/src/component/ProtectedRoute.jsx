import React, { use, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';


function ProtectedRoute() {
    const isAuthenticate = localStorage.getItem("isAuthenticate");
    return isAuthenticate ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;


    // useEffect(() => {

    //     const isAuthenticate = localStorage.getItem("logindata");
    //     if (!isAuthenticate) {
    //         navigate("/login"); 

    //     }

    // }, []);

    // return  <Outlet />;

