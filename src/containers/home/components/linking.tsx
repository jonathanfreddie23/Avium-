import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import SVG from 'react-inlinesvg';
import { motion, AnimatePresence } from 'framer-motion';

import config from 'config';

import Animation from 'lib/Animation';

import Icons from 'assets/icons';

import FontUtil from 'lib/Font';
import Translate from 'lib/Translate';
import Utils from 'lib/Utils';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';
import { AppDispatch, RootState } from 'redux/store';
import NavActions from 'lib/NavActions';

interface Props {
    twitterLoading: boolean;
    twitterError: string;

    getTwitterLink(): void;
}

const Linking = (props: Props): JSX.Element => {
    const { twitterLoading, twitterError, getTwitterLink } = props;

    const linkingStatus = Utils.Linking.getLinkingStatus();

    const { discord, twitter } = linkingStatus;

    const discordLink = `https://discord.com/oauth2/authorize?response_type=code&client_id=${config.clientId}&scope=identify email guilds.members.read&redirect_uri=${config.discordCallbackUrl}&prompt=consent`;

    if (discord && twitter) {
        NavActions.navToSelectRole();
    }

    const renderDiscord = () => {
        if (discord) {
            return (
                <IconContainer style={{ cursor: 'default' }}>
                    <DiscordIcon src={Icons.Discord} />
                    <Divider />
                    <ConnectedTextContainer>
                        {Translate.t('Home.Connected')}
                    </ConnectedTextContainer>
                </IconContainer>
            );
        }

        return (
            <IconContainer>
                <DiscordIcon src={Icons.Discord} onClick={() => window.open(discordLink, '_self')} />
                <Divider />
                <ConnectTextContainer href={discordLink}>
                    {Translate.t('Home.Connect')}
                </ConnectTextContainer>
            </IconContainer>
        );
    };

    const renderTwitter = () => {
        if (twitter) {
            return (
                <IconContainer style={{ cursor: 'default' }}>
                    <TwitterIcon src={Icons.Twitter} />
                    <Divider />
                    <ConnectedTextContainer>
                        {Translate.t('Home.Connected')}
                    </ConnectedTextContainer>
                </IconContainer>
            );
        }

        return (
            <IconContainer>
                <TwitterIcon src={Icons.Twitter} onClick={getTwitterLink} />
                <Divider />
                <ConnectTextContainer onClick={getTwitterLink}>
                    {Translate.t('Home.Connect')}
                </ConnectTextContainer>
            </IconContainer>
        );
    };

    return (
        <ColumnContainer
            key='linkingSection'
            initial='slideInInitial'
            animate='slideIn'
            exit='slideOut'
            transition={Animation.Transition}
            variants={Animation.Variants}
        >
            <MainContainerSignIn>
                <TitleContainerSignIn>{Translate.t('Home.WelcomeToInitiation')}</TitleContainerSignIn>
            </MainContainerSignIn>

            <AnimatePresence>
                <IconList
                    key='selectedBody'
                    initial='slideInInitial'
                    animate='slideIn'
                    exit='slideOut'
                    transition={Animation.Transition}
                    variants={Animation.Variants}
                >
                    {renderDiscord()}
                    {renderTwitter()}
                </IconList>
            </AnimatePresence>
        </ColumnContainer>
    );
};

const ColumnContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    z-index: 1;
`;

const Divider = styled.div`
    width: 50px;
    background: transparent;

    @media (max-width: 540px) {
        width: 25px;
    }
`;

const ConnectTextContainer = styled.a`
    display: flex;
    font-family: ${FontUtil.primary};
    font-weight: 700;
    font-size: 32px;
    color: white;
    z-index: 3;

    cursor: pointer;

    text-decoration: none;

    &:hover {
        color: white;
    }

    @media (max-width: 768px) {
        font-size: 28px;
    }
`;

const ConnectedTextContainer = styled.text`
    display: flex;
    font-family: ${FontUtil.primary};
    font-weight: 700;
    font-size: 32px;
    color: #42d404;
    z-index: 3;

    text-decoration: none;

    @media (max-width: 768px) {
        font-size: 28px;
    }
`;

const IconList = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    margin-top: 24px;

    width: 100%;

    @media ((min-width: 320px) and (max-width: 400px) ) {
        margin-top: 12px;
    }
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 8% 0 8%;

  background: transparent;
  border: 0px;

  cursor: pointer;

  @media ((min-width: 1000px) and (max-width: 1600px) ) {
    padding: 0 10% 0 10%;
    justify-content: center;
  }

  @media (max-width: 768px) {
    padding: 0 10% 0 10%;
  }

  margin-top: 24px;
`;

const DiscordIcon = styled(SVG)`
    justify-self: center;
    justify-content: center;
    justify-items: center;
    max-width: 70px;
    max-height: 70px;
    min-width: 70px;
    min-height: 70px;
    border-radius: 20px;

    transition: box-shadow 0.2s ease-in;

    &:hover {
        box-shadow:
            inset 10px 0 30px #2F80FF,
            inset -10px 0 30px #3FFBE0,
            inset 10px 0 100px #2F80FF,
            inset -10px 0 100px #3FFBE0,
            0 0 50px #fff,
            -10px 0 30px #2F80FF,
            10px 0 30px #3FFBE0;
    }
`;

const TwitterIcon = styled(SVG)`
    justify-self: center;
    justify-content: center;
    justify-items: center;
    max-width: 70px;
    max-height: 70px;
    min-width: 70px;
    min-height: 70px;
    border-radius: 35px;

    transition: box-shadow 0.2s ease-in;

    &:hover {
        box-shadow:
            inset 10px 0 30px #2F80FF,
            inset -10px 0 30px #3FFBE0,
            inset 10px 0 100px #2F80FF,
            inset -10px 0 100px #3FFBE0,
            0 0 50px #fff,
            -10px 0 30px #2F80FF,
            10px 0 30px #3FFBE0;
    }
`;

const MainContainerSignIn = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const TitleContainerSignIn = styled.div`
    color: white;
    font-family: 'sakana';
    font-weight: 700;
    font-size: 32px;
    line-height: 44px;
    text-align: center;

    margin-left: 20px;
    margin-right: 20px;
    
    margin-top: 200px;

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

const mapStateToProps = (state: RootState) => ({
    twitterLoading: Selectors.homeGetTwitterAttempting(state),
    twitterError: Selectors.homeGetTwitterError(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    getTwitterLink: () => dispatch(Actions.homeTwitterGetLinkAttempt()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Linking);
