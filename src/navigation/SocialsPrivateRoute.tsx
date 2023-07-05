import React, { FunctionComponent } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import Utils from 'lib/Utils';

const PrivateRoute: FunctionComponent = () => {
    const socialStatus = Utils.Linking.getLinkingStatus();

    const { twitter, discord } = socialStatus;

    if (!twitter || !discord) return <Navigate replace to='/' />;

    return (
        <div style={{ display: 'flex' }}>
            <Outlet />
        </div>
    );
};

export default PrivateRoute;
