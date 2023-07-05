import React, { FunctionComponent } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute: FunctionComponent = () => {
    const submissionId = sessionStorage.getItem('submissionIdStore');

    if (!submissionId) return <Navigate replace to='/' />;

    return (
        <div style={{ display: 'flex' }}>
            <Outlet />
        </div>
    );
};

export default PrivateRoute;
