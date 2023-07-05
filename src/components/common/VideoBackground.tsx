import React, { useState } from 'react';
import styled from 'styled-components';

import SVG from 'react-inlinesvg';
import { isMobile } from 'react-device-detect';

import Icons from 'assets/icons';
import DesktopBackgroundImage from 'assets/Images/DesktopFrame.png';
import MobileBackgroundImage from 'assets/Images/MobileFrame.png';

import NavActions from 'lib/NavActions';

interface VideoProps {
    src: string;

    id?: string;
    type?: string;
    onBack?(): void;
}

const VideoBackground = (props: VideoProps): JSX.Element => {
    const { src, type, id, onBack } = props;

    const [videoReady, setVideoReady] = useState(false);

    const imageBackgroundSrc = isMobile ? MobileBackgroundImage : DesktopBackgroundImage;

    const renderVideo = () => {
        return (
            <>
                {!videoReady && (<VideoLoading />)}
                <Video id={id} autoPlay loop muted playsInline onLoadedData={() => setVideoReady(true)}>
                    <source src={src} type={type} />
                </Video>
            </>
        );
    };

    const renderBackButton = () => {
        if (!onBack) return false;

        return (
            <BackButtonContainer onClick={onBack}>
                <Icon src={Icons.Back} />
            </BackButtonContainer>
        );
    };

    return (
        <>
            <Container>
                <Overlay />

                {renderVideo()}

                <ImageBackground src={imageBackgroundSrc} />
            </Container>

            {renderBackButton()}

            <IconContainer onClick={() => NavActions.navToHome()}>
                <Icon src={Icons.AviumWhite} />
            </IconContainer>
        </>
    );
};

const Container = styled.div`
    position: fixed;
    display: flex;

    width: 100vw;
    height: 100vh;
    
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: -1;
`;

const Overlay = styled.div`
    position: absolute;
    z-index: 1;

    background-color: black;
    opacity: 0.6;

    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

    pointer-events: none;
`;

const VideoLoading = styled.div`
    object-fit: cover;
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: black;
`;

const Video = styled.video`
    object-fit: cover;
    position: fixed;
    width: 100%;
    height: 100%;

    background-color: black;
`;

const IconContainer = styled.button`
    position: absolute;
    display: flex;
    height: 50px;
    width: 50px;

    left: 36px;
    top: 36px;

    cursor: pointer;

    border: none;
    background: transparent;

    z-index: 1;
`;

const BackButtonContainer = styled.button`
    position: absolute;
    display: flex;
    height: 50px;
    width: 50px;

    left: 130px;
    top: 100px;
    
    justify-content: center;
    align-items: center;

    cursor: pointer;

    border: none;
    background: transparent;

    &:hover {
        stroke: #fff; 
        stroke-width: 0.75;

        {-webkit-filter: drop-shadow( -.75px 0px 6px #31eefd );
        filter: drop-shadow( -.75px 0px 6px #31eefd ); stroke:#31eefd;}
    }

    z-index: 1;
`;

const Icon = styled(SVG)`
    z-index: 2;

    @media(max-width: 768px) {
        display: none;
    }
`;

const ImageBackground = styled.img`
    z-index: 1;

    height: 100vh;
    width: 100vw;

    position: fixed;
    object-fit: fill;
`;

VideoBackground.defaultProps = {
    type: 'video/mp4',
    id: 'background-video',
    onBack: undefined,
};

export default VideoBackground;
