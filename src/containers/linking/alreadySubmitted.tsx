import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

import Animation from 'lib/Animation';
import Translate from 'lib/Translate';
import FontUtils from 'lib/Font';

import LanguageSelectionBackground from 'components/common/LanguageSelectionBackground';
import FollowUsCol from 'components/common/FollowUsCol';

import ThankYouBackground from 'assets/backgrounds/alreadySubmitted.png';
import ThankYouMobileBackground from 'assets/backgrounds/alreadySubmitted-mobile.png';
import Dragonboy from 'assets/Images/DragonBoy-2.png';

const AlreadySubmitted = (): JSX.Element => {
    return (
        <MainContainer
            key='alreadysubmitted'
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
                <InnerContainer>
                    <TextContainer>
                        <Title>
                            {Translate.t('AlreadySubmitted.title')}
                        </Title>

                        <Title2>
                            {Translate.t('AlreadySubmitted.subtitle')}
                        </Title2>

                        <Text>
                            {Translate.t('AlreadySubmitted.subtitle2')}
                        </Text>
                    </TextContainer>
                </InnerContainer>

                <FollowUsCol />
            </BodyContainer>
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

const DragonboyImage = styled.img`
    height: 80%;

    object-fit: contain;

    pointer-events: none;

    position: absolute;
    bottom: 0px;
    left: 50px;

    @media (max-width: 1440px) {
        height: 75%;
    }

    @media (max-width: 1280px) {
        z-index: -1;
        height: 68%;
        left: 30px;
    }

    @media (max-width: 1024px) {
        height: 60%;
        left: 10px;
    }

    @media (max-width: 768px) {
        height: 50%;
    }

    @media (max-width: 540px) {
        height: 55%;
        left: -100px;
    }
`;

const BodyContainer = styled.div`
    display: flex;
    flex-direction: row;

    height: 100vh;
    width: 100vw;

    justify-content: space-between;

    @media (max-width: 540px) {
        flex-direction: column;
    }
`;

const InnerContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%; 

    @media (max-width: 540px) {
        height: 100%;
    }
`;

const TextContainer = styled.div`
    display: flex;
    width: 40%;
    flex-direction: column;
    justify-content: center;

    margin-right: 200px;

    @media (max-width: 1600px) {
        margin-right: 80px;
        width: 50%;
    }

    @media (max-width: 768px) {
        width: 60%;
        margin-right: 60px;
    }

    @media (max-width: 540px) {
        justify-content: center;
        align-items: center;

        width: 100%;

        margin: 0px 40px 220px;
    }
`;

const Title = styled.div`
    font-family: ${FontUtils.primary};
    font-size: 99px;
    line-height: 97px;

    text-align: right;

    color: white;

    @media (max-width: 1600px) {
        font-size: 80px;
        line-height: 88px;
    }

    @media (max-width: 1440px) {
        font-size: 78px;
        line-height: 82px;
    }

    @media (max-width: 1280px) {
        font-size: 70px;
        line-height: 78px;
    }

    @media (max-width: 1024px) {
        font-size: 60px;
        line-height: 68px;
    }

    @media (max-width: 768px) {
        font-size: 48px;
        line-height: 58px;
    }

    @media (max-width: 540px) {
        font-size: 33px;
        line-height: 34px;
        
        width: 100%;
    }
`;

const Title2 = styled.div`
    font-family: ${FontUtils.primary};
    font-size: 30px;
    line-height: 37px;
    text-align: right;
    color: white;

    margin-top: 20px;

    @media (max-width: 1440px) {
        font-size: 26px;
        line-height: 32px;
    }

    @media (max-width: 1280px) {
        font-size: 22px;
        line-height: 28px;
    }

    @media (max-width: 540px) {
        font-size: 18px;
        line-height: 20px;

        width: 100%;
    }
`;

const Text = styled.div`
    font-family: ${FontUtils.secondary};
    font-size: 16px;
    line-height: 30px;
    text-align: right;
    color: white;

    width: 50%;
    align-self: flex-end;

    margin-top: 20px; 

    @media (max-width: 1024px) {
        width: 70%;
    }

    @media (max-width: 540px) {
        width: 100%;

        font-size: 12px;
        line-height: 18px;

        align-self: flex-start;
        text-align: right;
    }
`;

export default AlreadySubmitted;
