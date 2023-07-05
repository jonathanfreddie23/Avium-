import React from 'react';
import styled from 'styled-components';

import { isMobile } from 'react-device-detect';

import DesktopBackgroundImageFrame from 'assets/Images/DesktopFrame.png';
import MobileBackgroundImageFrame from 'assets/Images/MobileFrame.png';

interface Props {
    desktopImageSrc: string;
    mobileImageSrc: string;
}

const LanguageSelectionBackground = (props: Props): JSX.Element => {
    const { desktopImageSrc, mobileImageSrc } = props;

    const imageBackgroundSrc = isMobile ? mobileImageSrc : desktopImageSrc;
    const imageBackgroundFrame = isMobile ? MobileBackgroundImageFrame : DesktopBackgroundImageFrame;

    return (
        <Container>
            <ImageBackground src={imageBackgroundSrc} />
            <ImageBackgroundFrame src={imageBackgroundFrame} />
        </Container>
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

const ImageBackgroundFrame = styled.img`
    z-index: 1;
    height: 100vh;
    width: 100vw;
    position: fixed;
    object-fit: fill;
`;

const ImageBackground = styled.img`
    z-index: 1;

    height: 100vh;
    width: 100vw;

    position: fixed;
    object-fit: fill;
`;

export default LanguageSelectionBackground;
