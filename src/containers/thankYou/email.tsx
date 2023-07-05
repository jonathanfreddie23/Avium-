import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Translate from 'lib/Translate';

import { motion } from 'framer-motion';

import Animation from 'lib/Animation';

import Button from 'components/common/Button';
import InputComponents from 'components/InputComponents';
import VideoBackground from 'components/common/VideoBackground';

import VideoScreen3 from 'assets/videos/VideoScreen3.mp4';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';
import { AppDispatch, RootState } from 'redux/store';

import FontUtil from 'lib/Font';
import NavActions from 'lib/NavActions';

interface Props {
    loading: boolean;
    error: string;

    submitEmail(email: string): void;
}

const Email = (props: Props): JSX.Element => {
    const { loading, submitEmail, error } = props;

    const [email, setEmail] = useState('');

    const onSubmit = () => {
        submitEmail(email);
    };

    return (
        <MainContainer
            key='emailPage'
            initial='pageInitial'
            animate='pageIn'
            exit='pageOut'
            transition={Animation.Transition}
            variants={Animation.Variants}
        >
            <VideoBackground src={VideoScreen3} onBack={() => NavActions.navBack()} />
            <TextContainer>
                <Text>{Translate.t('ThankYou.email1')}</Text>
                <Text>{Translate.t('ThankYou.email2')}</Text>
                <ThirdEmailText>{Translate.t('ThankYou.email3')}</ThirdEmailText>
            </TextContainer>
            <TextContainer style={{ paddingTop: 20 }}>
                <InputComponents
                    placeholder='eg: ezruaq@aviumorigins.com'
                    value={email}
                    onChangeText={(e) => setEmail(e.target.value)}
                    onEnterPressed={onSubmit}
                />
                <RowContainer>
                    <InputContainer />
                </RowContainer>
            </TextContainer>
            <Error>
                {error}
            </Error>
            <Button
                label={Translate.t('Home.Next')}
                onClick={onSubmit}
                style={{ marginTop: 10 }}
                loading={loading}
            />
        </MainContainer>
    );
};

const MainContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;

    width: 100%;
    height: 100vh;
    overflow: hidden;
    position: absolute;
    z-index: 3;

    justify-content: center;
    align-items: center;
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 12px;
    z-index: 5;
`;

const Text = styled.h1`
    display: flex;
    justify-content: center;
    margin-bottom: 15px;
    text-transform: uppercase;
    font-family: ${FontUtil.primary};
    font-size: 26px;
    color: white;
    width: 100%;
    z-index: -1;
    border-radius: 12px;    

    padding-left: 80px;
    padding-right: 80px;

    @media (max-width: 768px) {
        font-size: 20px;

        text-align: center;
    }
`;

const ThirdEmailText = styled.h1`
    display: flex;
    justify-content: center;
    margin-bottom: 15px;
    text-transform: uppercase;
    font-family: ${FontUtil.secondary};
    font-size: 18px;
    color: white;
    width: 100%;
    z-index: -1;
    border-radius: 12px;    

    padding-left: 80px;
    padding-right: 80px;
    margin-top: 20px;

    @media (max-width: 768px) {
        font-size: 16px;

        text-align: center;
    }

    @media (max-width: 540px) {
        font-size: 14px;
    }
`;

const InputContainer = styled.div`
    display: flex;
    border-bottom: 2px solid #fff;
    width: 100%;
`;

const RowContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
`;

const Error = styled.text`
    color: white;
    font-family: ${FontUtil.primary};
    margin-top: 12px;
    font-weight: 700;
    font-size: 14px;
`;

const mapStateToProps = (state: RootState) => ({
    loading: Selectors.homeGetSubmitEmailAttempting(state),
    error: Selectors.homeGetSubmitEmailError(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    submitEmail: (email: string) => dispatch(Actions.homeSubmitEmailAttempt({ email })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Email);
