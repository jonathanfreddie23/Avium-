import React, { useEffect } from 'react';

import Routes from 'navigation/Routes';

import packageJson from '../../package.json';

const AppRoot = (): JSX.Element => {
    useEffect(() => {
        console.log(`App version: ${packageJson.version} (${process.env.REACT_APP_ENV})`);
    }, []);

    return (
        <Routes />
    );
};

export default AppRoot;
