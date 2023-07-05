import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { ThreeDots } from 'react-loader-spinner';
import { connect } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import SVG from 'react-inlinesvg';

import VideoBackground from 'components/common/VideoBackground';

import Actions from 'redux/Actions';
import { AppDispatch, RootState } from 'redux/store';
import Selectors from 'redux/Selectors';

import Animation from 'lib/Animation';
import NavActions from 'lib/NavActions';

import Icons from 'assets/icons';
import FontUtil from 'lib/Font';
import Translate from 'lib/Translate';

import VideoScreen1 from '../../assets/videos/VideoScreen1.mp4';

interface Props {
    linkDiscordAttempt(code: string): void;
    error: string;
}

const CallBackDiscord = (props: Props): JSX.Element => {
    const { linkDiscordAttempt, error } = props;
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const callbackCode = searchParams.get('code');

        if (!callbackCode || !callbackCode.length) {
            NavActions.navToHome();
        } else {
            linkDiscordAttempt(callbackCode);
        }
    }, []);

    const renderBody = () => {
        const splitError = error.split('.');

        const renderMessage = () => {
            return splitError.filter((item) => item.length > 0).map((item) => (
                <ErrorMessage>{`${item}.`}</ErrorMessage>
            ));
        };

        if (error) {
            return (
                <ColumnContainer>
                    <IconContainer>
                        <ErrorIcon
                            src={Icons.NotVerified}
                        />
                    </IconContainer>

                    {renderMessage()}
                </ColumnContainer>
            );
        }

        return (
            <>
                <TitleContainerSignIn>{Translate.t('Home.Loading')}</TitleContainerSignIn>

                <ColumnContainer>
                    <IconContainerLoading>
                        <ThreeDots
                            height='80'
                            width='80'
                            radius='9'
                            color='#3384FD'
                            ariaLabel='three-dots-loading'
                            visible
                        />
                    </IconContainerLoading>
                </ColumnContainer>
            </>
        );
    };

    return (
        <MainContainer
            key='discordCallback'
            initial='pageInitial'
            animate='pageIn'
            exit='pageOut'
            transition={Animation.Transition}
            variants={Animation.Variants}
        >
            <VideoBackground src={VideoScreen1} />
            <ColumnContainer>
                {renderBody()}
            </ColumnContainer>
        </MainContainer>
    );
};

const ColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const IconContainerLoading = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;  
`;

const TitleContainerSignIn = styled.div`
    color: white;
    font-weight: 700;

    font-family: ${FontUtil.primary};
    font-size: 34px;
`;

const IconContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;  
`;

const ErrorIcon = styled(SVG)`
    justify-self: center;
    justify-content: center;
    justify-items: center;
    align-items: center;
    max-width: 200px;
    max-height: 200px;
    width: 117px;
    height: 117px;
`;

const ErrorMessage = styled.text`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    color: white;
    font-family: ${FontUtil.primary};
    margin-top: 20px;
    font-weight: 700;
    font-size: 32px;
    line-height: 35px;
    text-align: center;

    margin-left: 20px;
    margin-right: 20px;

    @media (max-width: 380px ) {
        font-weight: 700;
        font-size: 20px;
        line-height: 28px;
    }

    @media (max-width: 420px ) {
        font-weight: 700;
        font-size: 21px;
        line-height: 28px;
    }

    @media (max-width: 500px ) {
        font-weight: 700;
        font-size: 23px;
        line-height: 28px;
    }

    @media (max-width: 650px ) {
        font-weight: 700;
        font-size: 25px;
        line-height: 29px;
    }

    @media (max-width: 750px ) {
        font-weight: 700;
        font-size: 27px;
        line-height: 30px;
    }

    @media (max-width: 850px ) {
        font-weight: 700;
        font-size: 29px;
        line-height: 31px;
    }
`;

const MainContainer = styled(motion.div)`
    width: 100%;
    height: 100vh;
    overflow: hidden;

    display: flex;
    align-items: center;
    justify-content: center;

    overflow: hidden;
    position: absolute;
    z-index: 3;
`;

const mapStateToProps = (state: RootState) => ({
    loading: Selectors.homeDiscordAuthAttempting(state),
    error: Selectors.homeDiscordAuthError(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    linkDiscordAttempt: (code: string) => dispatch(Actions.homeDiscordAuthAttempt({ code })),
});

export default connect(mapStateToProps, mapDispatchToProps)(CallBackDiscord);
