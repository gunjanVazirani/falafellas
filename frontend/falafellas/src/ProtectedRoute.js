import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { auth } from "./FirebaseService";

function ProtectedRoute(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                navigate("/login");
            }
        });
    }, []);

    return (
        isLoggedIn ? <Outlet /> : null
    );
}

export default ProtectedRoute;