import React, { useState, createRef } from 'react';
import styled from 'styled-components';
import SVG from 'react-inlinesvg';
import { ThreeDots } from 'react-loader-spinner';
import { connect } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import Recaptcha, { ReCAPTCHA } from 'react-google-recaptcha';

import config from 'config';

import { AppDispatch, RootState } from 'redux/store';
import Selectors from 'redux/Selectors';
import Actions from 'redux/Actions';

import LinkingPage from 'containers/home/components/linking';
import InputComponents from 'components/InputComponents';
import Button from 'components/common/Button';
import VideoBackground from 'components/common/VideoBackground';

import Icons from 'assets/icons';
import { ReferralKeyResponse } from 'api/HomeBase';

import Animation from 'lib/Animation';
import FontUtil from 'lib/Font';
import Translate from 'lib/Translate';
import NavActions from 'lib/NavActions';

import VideoScreen1 from '../../assets/videos/VideoScreen1.mp4';

interface HomeScreenProps {
    setReferralKeyAttempt: boolean,
    setReferralFail: string,
    setReferralSuccess: ReferralKeyResponse | null,

    setReferralKey: (id: string, recaptchaValue: string | null) => void;
    resetReferralKeyAttempt: (status: boolean) => void;
    resetHomeReferralKeyFail: (status: string) => void;
    resetHomeReferralKeyAttemptSuccess: (status: null) => void;

    homeStage: number;
    setHomeStage(stage: number): void;
}

const HomeScreen = (props: HomeScreenProps): JSX.Element => {
    const {
        setReferralKeyAttempt,
        setReferralFail,
        setReferralSuccess,
        setReferralKey,
        resetReferralKeyAttempt,
        resetHomeReferralKeyAttemptSuccess,
        resetHomeReferralKeyFail,

        homeStage,
        setHomeStage,
    } = props;

    const recaptchaRef = createRef<ReCAPTCHA>();

    const [inputValue, setInputValue] = useState('');
    const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
    const [recaptchaError, setRecaptchaError] = useState<boolean>(false);

    const submitKey = () => {
        if (recaptchaValue) {
            setReferralKey(inputValue, recaptchaValue);

            if (recaptchaRef.current) {
                recaptchaRef.current.reset();
            }
        } else setRecaptchaError(true);
    };

    const handleBackPressed = () => {
        if (setReferralFail) {
            resetReferralKeyAttempt(false);
            resetHomeReferralKeyFail('');
            resetHomeReferralKeyAttemptSuccess(null);
            return;
        }

        if (homeStage > 0) setHomeStage(homeStage - 1);
        else if (homeStage <= 0) NavActions.navBack();
    };

    const handleCaptchaSolved = (value: string | null) => {
        setRecaptchaValue(value);
    };

    const renderEnterKey = () => {
        if (setReferralKeyAttempt) {
            // loading
            return (
                <ColumnContainer>
                    <IconContainer>
                        <ThreeDots
                            height='80'
                            width='80'
                            radius='9'
                            color='#3384FD'
                            ariaLabel='three-dots-loading'
                            visible
                        />
                    </IconContainer>

                    <MessageContainer>{Translate.t('Home.InitialisingCube')}</MessageContainer>
                </ColumnContainer>
            );
        }

        if (setReferralFail) {
            // failed ref
            return (
                <ColumnContainer>
                    <IconContainer>
                        <NotVerifiedIcon
                            src={Icons.NotVerified}
                        />
                    </IconContainer>

                    <MessageReenterContainer>{Translate.t('Home.reenterCode')}</MessageReenterContainer>
                    <Button
                        label={Translate.t('Home.TryAgain')}
                        onClick={() => [
                            setHomeStage(1),
                            resetReferralKeyAttempt(false),
                            resetHomeReferralKeyFail(''),
                            resetHomeReferralKeyAttemptSuccess(null),
                        ]}
                        style={{ marginTop: 15 }}
                    />
                </ColumnContainer>
            );
        }

        return (
            <ColumnContainer
                key='enterKeySection'
                initial='slideInInitial'
                animate='slideIn'
                exit='slideOut'
                transition={Animation.Transition}
                variants={Animation.Variants}
                style={{ marginTop: 45, alignItems: 'center' }}
            >
                <ColumnContainer>
                    <EnterKeyText>{Translate.t('Home.enterKey')}</EnterKeyText>
                </ColumnContainer>
                <ColumnContainer>
                    <InputComponents
                        placeholder={Translate.t('Home.Inputcode')}
                        value={inputValue}
                        onChangeText={(e) => setInputValue(e.target.value)}
                        onEnterPressed={() => [submitKey()]}
                    />
                    <RowContainer>
                        <InputContainer />
                    </RowContainer>
                </ColumnContainer>

                <RecaptchaContainer>
                    <Recaptcha
                        ref={recaptchaRef}
                        sitekey={config.recaptchaSiteKey}
                        onChange={handleCaptchaSolved}
                        size='normal'
                        theme='dark'
                    />
                </RecaptchaContainer>

                {recaptchaError === true && (
                    <ErrorMessage>
                        Please verify the captcha before continuing.
                    </ErrorMessage>
                )}

                <Button
                    label={Translate.t('Home.Next')}
                    onClick={submitKey}
                    style={{ marginTop: 10 }}
                />
            </ColumnContainer>
        );
    };

    const renderWelcomePage = () => {
        return (
            <ColumnContainer
                key='signInSection'
                initial='slideInInitial'
                animate='slideIn'
                exit='slideOut'
                transition={Animation.Transition}
                variants={Animation.Variants}
            >
                <IconContainer>
                    <VerifiedIcon
                        src={Icons.Verified}
                    />
                </IconContainer>
                <WelcomeMessageContainer>{Translate.t('Home.WelcomeToInitiation')}</WelcomeMessageContainer>

                <Button
                    onClick={() => setHomeStage(3)}
                    label={Translate.t('Home.Signin')}
                    style={{ marginTop: 15 }}
                />
            </ColumnContainer>
        );
    };

    const renderBody = () => {
        if (homeStage === 1) return renderEnterKey();
        if (homeStage === 2) return renderWelcomePage();
        if (homeStage === 3) return <LinkingPage />;

        return (
            <MainButtonContainer
                key='initiateButton'
                initial='fadeInInitial'
                animate='fadeIn'
                exit='fadeOut'
                transition={Animation.Transition}
                variants={Animation.Variants}
            >
                <ButtonContainerWrapGetInitiated onClick={() => {
                    setHomeStage(1);
                    setInputValue('');
                }}
                >
                    <ButtonContainerTag>
                        {Translate.t('Home.getinitiated')}
                    </ButtonContainerTag>
                </ButtonContainerWrapGetInitiated>
            </MainButtonContainer>
        );
    };

    return (
        <MainContainer
            key='home'
            initial='pageInitial'
            animate='pageIn'
            exit='pageOut'
            transition={Animation.Transition}
            variants={Animation.Variants}
        >
            <VideoBackground
                src={VideoScreen1}
                type='video/mp4'
                onBack={handleBackPressed}
            />

            <AnimatePresence>
                <MainButtonContainer>
                    {renderBody()}
                </MainButtonContainer>
            </AnimatePresence>
        </MainContainer>
    );
};

const WelcomeMessageContainer = styled.text`
    display: flex;
    color: white;
    font-family: ${FontUtil.primary};

    margin-top: 20px;
    font-weight: 700;
    font-size: 32px;
    line-height: 35px;
    
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

    background: linear-gradient(90deg, rgba(2,0,36,.1) 0%, rgba(0,0,0,.1) 100%, rgba(187,188,189,.1) 100%);
`;

const RecaptchaContainer = styled.div`
    margin-top: 20px;
`;

const MessageReenterContainer = styled.div`
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

const IconContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;  
`;

const MessageContainer = styled.div`
    color: white;
    font-family: ${FontUtil.primary};
    margin-top: 20px;
    font-weight: 700;
    font-size: 32px;
    line-height: 35px;

    text-align: center;
`;

const MainContainer = styled(motion.div)`
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    z-index: 3;
`;

const VerifiedIcon = styled(SVG)`
    justify-self: center;
    justify-content: center;
    justify-items: center;
    align-items: center;
    color: #25D366;
    max-width: 100px;
    max-height: 100px;
`;

const NotVerifiedIcon = styled(SVG)`
    justify-self: center;
    justify-content: center;
    justify-items: center;
    align-items: center;
    max-width: 200px;
    max-height: 200px;
    width: 117px;
    height: 117px;
`;

const MainButtonContainer = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
`;

const ButtonContainerTag = styled.div`
    display: flex;
    flex-direction: column;
    width: 40%;
    height: 80%;
    background: transparent linear-gradient(74deg, #327DFA 0%, #39CBFF 100%) 0% 0% no-repeat padding-box;    
    border-radius: 24px;
    font-family: ${FontUtil.primary};
    justify-content: center;
    align-items: center;
    color: white;
    text-transform: uppercase;
    justify-content: center;
    align-items: center;
    font-size: 32px;
    line-height: 35px;
    font-weight: 700;

    z-index: 1;

    overflow: hidden;
    transition: all .3s;
    position: relative;

    &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        z-index: -2;
    }

    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 0%;
        width: 100%;
        background: linear-gradient(#FE3D6C 0%, #FC9995 100%);
        transition: all .3s;
        z-index: -1;
    }
            
    &:hover {
        color: #fff;

        &:before {
            height: 100%;
        }
    }

    @media (max-width: 1190px ) {
        font-weight: 700;
        font-size: 28px;
        line-height: 26px;
        height: 90%;
    }

    @media (max-width: 1140px ) {
        font-weight: 700;
        font-size: 22px;
        line-height: 22px;
        width: 40%;
        height: 80%;
    }

    @media (max-width: 880px ) {
        font-weight: 700;
        font-size: 20px;
        line-height: 22px;
        width: 45%;
        height: 80%;
    }

    @media (max-width: 780px ) {
        font-weight: 700;
        font-size: 18px;
        line-height: 22px;
        width: 50%;
        height: 70%;
    }

    @media (max-width: 600px ) {
        font-weight: 700;
        font-size: 18px;
        line-height: 22px;
        
        width: 60%;
        height: 70%;
    }

    @media (max-width: 560px ) {
        font-weight: 700;
        font-size: 16px;
        line-height: 20px;
        width: 60%;
        height: 60%;
    }

    @media (max-width: 410px ) {
        font-weight: 700;
        font-size: 16px;
        line-height: 20px;
        width: 90%;
        height: 70%;
    }

    @media (max-width: 330px ) {
        font-weight: 700;
        font-size: 16px;
        line-height: 20px;
        width: 100%;
        height: 70%;
    }
`;

const ButtonContainerWrapGetInitiated = styled.button`
    display: flex;
    justify-content: center;
    background-color: transparent;
    border: none;
    width: 100%;
    height: 15%;

    margin-top: 10%;

    @media (max-width: 768px) {
        margin-top: 20%;
    }

    @media (max-width: 540px) {
        margin-top: 35%;
    }
`;

const InputContainer = styled.div`
    display: flex;
    border-bottom: 2px solid #fff;
    width: 100%;
`;

const ColumnContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 12px;
    z-index: 5;
`;

const RowContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
`;

const EnterKeyText = styled.h1`
    display: flex;
    justify-content: center;
    margin-bottom: 5%;
    text-transform: uppercase;
    font-family: ${FontUtil.primary};
    font-size: 32px;
    color: white;
    margin-top: 25%;
    width: 100%;
    height: 100%;
    z-index: -1;
    border-radius: 12px;
`;

const ErrorMessage = styled.div`
    font-family: ${FontUtil.primary};
    font-size: 14px;

    margin-top: 12px;
    width: 250px;
    color: red;
    text-align: center;
`;

const mapStateToProps = (state: RootState) => ({
    setReferralKeyAttempt: Selectors.homeGetReferralKeyAttempting(state),
    setReferralFail: Selectors.homeGetReferralKeyError(state),
    setReferralSuccess: Selectors.homeGetReferralKeySuccess(state),
    selectedLanguage: Selectors.getUiSelectedLanguage(state),

    routeState: Selectors.routerGetLocationState(state),

    homeStage: Selectors.getUiHomeStage(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    setReferralKey: (id: string, recaptchaValue: string | null) =>
        dispatch(Actions.homeReferralKeyAttempt({ id, recaptchaValue })),
    resetReferralKeyAttempt: (status: boolean) =>
        dispatch(Actions.resetHomeReferralKeyAttempt(status)),
    resetHomeReferralKeyFail: (status: string) =>
        dispatch(Actions.resetHomeReferralKeyFail(status)),
    resetHomeReferralKeyAttemptSuccess: (status: null) =>
        dispatch(Actions.resetHomeReferralKeyAttemptSuccess(status)),
    setLanguage: (language: string) =>
        dispatch(Actions.setLanguage(language)),
    setHomeStage: (stage: number) =>
        dispatch(Actions.uiSetHomeStage(stage)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
