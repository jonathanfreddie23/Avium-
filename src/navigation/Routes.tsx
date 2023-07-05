import React, { FunctionComponent } from 'react';
import { HistoryRouter as Router } from 'redux-first-history/rr6';

import { history } from 'redux/store';

import AnimatedRoutes from './AnimatedRoutes';

const NavRoutes: FunctionComponent = () => {
    return (
        <Router history={history}>
            <AnimatedRoutes />
        </Router>
    );
};

export default NavRoutes;
