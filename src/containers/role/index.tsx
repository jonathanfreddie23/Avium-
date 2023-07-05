import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import { connect } from 'react-redux';

import VideoJs from 'components/videoJs';
import VideoBackground from 'components/common/VideoBackground';

import Animation from 'lib/Animation';

import VideoScreen2 from '../../assets/videos/VideoScreen2.mp4';

const RoleScreen = (): JSX.Element => {
    return (
        <MainContainer
            key='role'
            initial='pageInitial'
            animate='pageIn'
            exit='pageOut'
            transition={Animation.Transition}
            variants={Animation.Variants}
        >
            <VideoJs />

            <VideoBackground src={VideoScreen2} />
        </MainContainer>
    );
};

const MainContainer = styled(motion.div)`
    width: 100%;
    height: 100vh;
    overflow: hidden;
    position: absolute;
    z-index: 3;
`;

export default connect(null, null)(RoleScreen);
