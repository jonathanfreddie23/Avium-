import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

import LanguageSelectionBackground from 'components/common/LanguageSelectionBackground';

import ThankYouBackground from 'assets/backgrounds/ThankYouBackground.png';
import ThankYouMobileBackground from 'assets/backgrounds/ThankYouBackground-Mobile.png';
import Dragonboy from 'assets/Images/DragonBoy.png';

import Animation from 'lib/Animation';

import FontUtil from 'lib/Font';
import Translate from 'lib/Translate';
import FollowUsCol from 'components/common/FollowUsCol';

const ThankYou = (): JSX.Element => {
    return (
        <MainContainer
            key='thankyou'
            initial='pageInitial'
            animate='pageIn'
            exit='pageOut'
            transition={Animation.Transition}
            variants={Animation.Variants}
        >
            <LanguageSelectionBackground
                desktopImageSrc={ThankYouBackground}
                mobileImageSrc={ThankYouMobileBackground}
            />

            <DragonboyImage src={Dragonboy} />

            <BodyContainer>
                <MessageBody>
                    <Message>{Translate.t('ThankYou.thankyou1')}</Message>
                    <Message2>{Translate.t('ThankYou.thankyou2')}</Message2>
                </MessageBody>

                <FollowUsCol />
            </BodyContainer>
        </MainContainer>
    );
};

const BodyContainer = styled.div`
    display: flex;
    flex-direction: row;

    height: 100vh;

    justify-content: space-between;

    @media (max-width: 540px) {
        flex-direction: column;
    }
`;

const MessageBody = styled.div`
    display: flex;
    flex-direction: column;

    width: 30%;
    justify-content: center;
    align-items: flex-start;
    overflow: hidden;
    margin-left: 120px;

    @media (max-width: 1440px) {
        width: 40%;
    }

    @media (max-width: 1024px) {
        margin-left: 50px;
        width: 50%;
    }

    @media (max-width: 768px) {
        width: 60%;
    }

    @media (max-width: 540px) {
        margin-left: 0px;
        padding-left: 40px;
        padding-right: 40px;
        width: 100%;
        height: 100%;
    }
`;

const Message = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    color: white;

    font-family: ${FontUtil.primary};
    font-weight: 700;
    font-size: 60px;
    line-height: 60px;
    text-align: left;

    @media (max-width: 1024px) {
      font-size: 50px;
      line-height: 50px;

      font-size: 35px;
    }

    @media (max-width: 540px) {
        width: 100%;
        font-size: 30px;
        line-height: 30px;
      }
`;

const Message2 = styled.div`
    display: flex;
    flex-direction: column;

    margin-top: 30px;
    width: 70%;

    justify-content: center;
    align-items: center;
    overflow: hidden;
    color: white;
    
    font-family: ${FontUtil.secondary};
    font-size: 16px;
    line-height: 30px;
    text-align: left;
    letter-spacing: 0px;

    @media (max-width: 1024px) {
      font-size: 16px;
      line-height: 30px;
    }

    @media (max-width: 540px) {
        margin-top: 22px;
        width: 100%;

        font-size: 10px;
        line-height: 18px;
      }
`;

const DragonboyImage = styled.img`
    height: 90%;
    width: 100vw;

    object-fit: contain;

    pointer-events: none;

    position: absolute;
    bottom: 0px;

    @media (max-width: 1440px) {
        height: 75%;
    }

    @media (max-width: 1280px) {
        z-index: -1;
        height: 70%;
    }

    @media (max-width: 1024px) {
        height: 70%;
    }

    @media (max-width: 540px) {
        height: 50%;
    }
`;

const MainContainer = styled(motion.div)`
    width: 100%;
    height: 100vh;
    overflow: hidden;
    position: absolute;
    z-index: 3;
`;

export default ThankYou;
