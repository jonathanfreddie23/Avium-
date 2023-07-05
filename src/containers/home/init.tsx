import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { setUserLanguage } from 'lib/Translate';

import { AppDispatch } from 'redux/store';
import Actions from 'redux/Actions';

import LanguageSelectionBackground from 'components/common/LanguageSelectionBackground';

import AviumLogo from 'assets/videos/Logo.mp4';
import DesktopBackgroundImage from 'assets/backgrounds/Background_desktop_LanguageScreen.jpg';
import MobileBackgroundImage from 'assets/backgrounds/background_Mobile_LanguageScreen.jpg';

import Animation from 'lib/Animation';
import NavActions from 'lib/NavActions';

interface HomeScreenProps {
    setLanguage: (language: string) => void;

}

const InitScreen = (props: HomeScreenProps): JSX.Element => {
    const { setLanguage } = props;

    const [videoEnd, setVideoEnd] = useState(false);

    const handleLangSelected = (lang: string) => {
        setLanguage(lang);
        setUserLanguage(lang);

        NavActions.navToHome();
    };

    const renderLanguageSelectBody = () => {
        if (!videoEnd) return false;

        return (
            <AnimatePresence>
                <RoleNameContainer
                    key='initButtonList'
                    initial='pageInitial'
                    animate='pageIn'
                    exit='pageOut'
                    transition={Animation.Transition}
                    variants={Animation.Variants}
                >
                    <NameContainer onClick={() => handleLangSelected('en')}>
                        <ButtonLabel>[EN]</ButtonLabel>
                        <RoleIcon>Eng</RoleIcon>

                    </NameContainer>

                    <NameContainer onClick={() => handleLangSelected('cn')}>
                        <ButtonLabel>[CN]</ButtonLabel>
                        <RoleIcon>中文</RoleIcon>

                    </NameContainer>

                    <NameContainer onClick={() => handleLangSelected('jp')}>
                        <ButtonLabel>[JP]</ButtonLabel>
                        <RoleIcon>日本語</RoleIcon>
                    </NameContainer>

                    <NameContainer onClick={() => handleLangSelected('kr')}>
                        <ButtonLabel>[KR]</ButtonLabel>
                        <RoleIcon>한국어</RoleIcon>
                    </NameContainer>

                </RoleNameContainer>
            </AnimatePresence>
        );
    };

    return (
        <MainContainer
            key='init'
            initial='pageInitial'
            animate='pageIn'
            exit='pageOut'
            transition={Animation.Transition}
            variants={Animation.Variants}
        >
            <LanguageSelectionBackground
                desktopImageSrc={DesktopBackgroundImage}
                mobileImageSrc={MobileBackgroundImage}
            />

            <MainButtonContainer>
                <IconAviumLogo id='logo' autoPlay muted playsInline onEnded={() => setVideoEnd(true)}>
                    <source src={AviumLogo} type='video/mp4' />
                </IconAviumLogo>

                <WelcomeMessageContainerLanguage>
                    <ButtonMainContainer>
                        {renderLanguageSelectBody()}
                    </ButtonMainContainer>

                </WelcomeMessageContainerLanguage>
            </MainButtonContainer>
        </MainContainer>
    );
};

const NameContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 10;

    color: white;

    margin-top: 200px;

    padding-left: 4px;
    padding-right: 4px;
    
    &:hover {
        background: -webkit-linear-gradient(#eee, #333);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
`;

const IconAviumLogo = styled.video`
    z-index: 2;
    border-color: white;

    max-width: 250px;
    max-height: 250px;
    object-fit: fill;

    position: absolute;
    margin-bottom: 200px;

    border-radius: 20px;
`;

const RoleIcon = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-weight: 700;
    height: 40px;
    width: 100%;
    font-size: 26px;
    text-align: center;
    line-height: 16px;
    align-items: center;
    font-family: sakana;

    @media (max-width: 540px) {
        font-size: 18px;
    }
`;

const ButtonLabel = styled.text`
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 26px;
    text-align: center;
    text-transform: uppercase;
    font-weight: 700;
    width: 100%;
    line-height: 16px;
    align-items: center;
    font-family: 'sakana';
    height: 40px;

    @media (max-width: 540px) {
        font-size: 18px;
    }
`;

const RoleNameContainer = styled(motion.div)`
    display: flex;
    flex-direction: row;
    flex-wrap:  wrap;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 100px;
    width: 60vw;

    @media (max-width: 768px) {
        width: 100vw;
    }
`;

const ButtonMainContainer = styled.button`
    display: flex;
    flex-direction: row;
    background-color: transparent;
    border: none;
`;

const WelcomeMessageContainerLanguage = styled.text`
    display: flex;
    color: white;
    font-family: sakana;
    font-weight: 700;
    font-size: 32px;
    line-height: 35px;
    color: white;
    text-align: center;

    @media (max-width: 500px ) {
        font-weight: 700;
        font-size: 28px;
        line-height: 25px;
    }

    @media (max-width: 400px ) {
        padding: 0px 15% 0px 15%;
        font-weight: 600;
        font-size: 26px;
        line-height: 28px;
    }
`;

const MainContainer = styled(motion.div)`
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    z-index: 3;
`;

const MainButtonContainer = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;
`;

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    setLanguage: (language: string) =>
        dispatch(Actions.setLanguage(language)),
});

export default connect(null, mapDispatchToProps)(InitScreen);
