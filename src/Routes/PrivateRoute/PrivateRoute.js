import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';


const PrivateRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext);
    console.log(user);
    const location = useLocation();
    console.log(user);
    console.log(loading);

    if (!user) {

        if (loading) {
            return <div className="spinner-border text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        }

        return <Navigate to='/login' state={{ from: location }} replace></Navigate>
    } else {
        return children;
    }

};

export default PrivateRoute;