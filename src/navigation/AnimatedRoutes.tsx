import React, { FunctionComponent } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import { AnimatePresence } from 'framer-motion';

import InitScreen from 'containers/home/init';
import HomeScreen from 'containers/home';
import RoleScreen from 'containers/role';
import CallBack from 'containers/linking/callBack';
import TwitterCallback from 'containers/linking/twitterCallback';
import AlreadySubmitted from 'containers/linking/alreadySubmitted';
import AlreadyApproved from 'containers/linking/alreadyApproved';
import QuestionAnswer from 'containers/questionAnswer/index';
import Email from 'containers/thankYou/email';
import ThankYou from 'containers/thankYou/thankyou';

import PrivateRoute from './PrivateRoute';
import SocialsPrivateRoute from './SocialsPrivateRoute';

const PrivateSocialsBucket: FunctionComponent = () => {
    return (
        <Route path='/' element={<SocialsPrivateRoute />}>
            <Route path='/role' element={<RoleScreen />} />
            <Route path='/answer' element={<QuestionAnswer />} />
            <Route path='/email' element={<Email />} />
        </Route>
    );
};

const PrivateBucket: FunctionComponent = (props) => {
    return (
        <Route path='/' element={<PrivateRoute />}>
            <Route path='/link/discord/callback' element={<CallBack />} />
            <Route path='/link/twitter/callback' element={<TwitterCallback />} />
            <Route path='/link/submitted' element={<AlreadySubmitted />} />
            <Route path='/link/approved' element={<AlreadyApproved />} />

            {PrivateSocialsBucket(props)}
        </Route>
    );
};

const TransitionAnimation: FunctionComponent = (props) => {
    const location = useLocation();

    return (
        <AnimatePresence initial={false}>
            <Routes key={location.pathname} location={location}>
                <Route path='/' element={<InitScreen />} />
                <Route path='/start' element={<HomeScreen />} />
                <Route path='/thankyou' element={<ThankYou />} />

                <Route path='*' element={<Navigate replace to='/' />} />
                {PrivateBucket(props)}
            </Routes>
        </AnimatePresence>
    );
};

export default TransitionAnimation;
