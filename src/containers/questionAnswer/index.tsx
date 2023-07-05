import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SVG from 'react-inlinesvg';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { AppDispatch, RootState } from 'redux/store';
import Selectors from 'redux/Selectors';
import Actions from 'redux/Actions';

import Animation from 'lib/Animation';
import NavActions from 'lib/NavActions';

import VideoBackground from 'components/common/VideoBackground';

import QuestionLov from 'lib/LOV/RoleQuestions';
import FontUtil from 'lib/Font';
import Translate from 'lib/Translate';

import { Question, QuestionTypeEnum } from 'entities/questions';

import VideoScreen3 from '../../assets/videos/VideoScreen3.mp4';
import artistLogo1 from '../../assets/Images/Artist-1.png';
import artistLogo2 from '../../assets/Images/Artist-2.png';
import artistLogoWhite from '../../assets/Images/ArtistWhite.png';
import contentCreator1 from '../../assets/Images/Content-Creator-1.png';
import contentCreator2 from '../../assets/Images/Content-Creator-2.png';
import contentCreatorWhite from '../../assets/Images/Content CreatorWhite.png';
import storyteller1 from '../../assets/Images/Storyteller-1.png';
import storyteller2 from '../../assets/Images/Storyteller-2.png';
import storytellerWhite from '../../assets/Images/StorytellerWhite.png';
import Flipper1 from '../../assets/Images/Flipper-1.png';
import Flipper2 from '../../assets/Images/Flipper-2.png';
import FlipperWhite from '../../assets/Images/FlipperWhite.png';
import Esports1 from '../../assets/Images/Esports-1.png';
import Esports2 from '../../assets/Images/Esports-2.png';
import EsportsWhite from '../../assets/Images/EsportsWhite.png';
import Entrepreneur1 from '../../assets/Images/Entrepeneuer-1.png';
import Entrepreneur2 from '../../assets/Images/Entrepeneuer-2.png';
import EntrepreneurWhite from '../../assets/Images/EntrepreneurWhite.png';

import Builder1 from '../../assets/Images/Builder-1.png';
import Builder2 from '../../assets/Images/Builder-2.png';
import BuilderWhite from '../../assets/Images/BuilderWhite.png';

import ImLost1 from '../../assets/Images/Im-lost-1.png';
import ImLost2 from '../../assets/Images/Im-lost-2.png';
import ImLostWhite from '../../assets/Images/Im LostWhite.png';
import QuestionContainer from './components/Question';
import ProgressBar from './components/ProgressBar';

interface AnswerParams {
    index: number;
    answer: string;
    answerFile: File | null;
    questionType: QuestionTypeEnum;
    isLastQuestion: boolean;
}

interface AnswerProps {
    getRoleNumber: number | null,
    answerQuestionAttempting: boolean,
    answerError: string,
    answerSuccess: string | null,

    counter: number,
    answerAttempt: (params: AnswerParams) => void;
    setCounter: (state: number) => void;
}

interface NavParams {
    roleNumber: number | null;
}

const Answer = (props: AnswerProps): JSX.Element => {
    const { getRoleNumber,
        answerQuestionAttempting,
        answerError,
        answerSuccess,

        counter,
        answerAttempt,
        setCounter } = props;

    const useLocationstate = useLocation();

    const [questionList, setQuestionList] = useState<Question[]>([]);
    const [roleNumber, setRoleNumber] = useState<number | null>(0);
    const [iconType1, setIconType1] = useState('');
    const [iconType2, setIconType2] = useState('');
    const [iconTypeWhite, setIconTypeWhite] = useState('');
    const [roleName, setRoleName] = useState('');

    useEffect(() => {
        getRoleNumberFunction();
        if (roleNumber) {
            const listOfQuestions = QuestionLov.find((item) => item.role === roleNumber);

            if (!listOfQuestions) {
                NavActions.navToSelectRole();
                return;
            }

            setQuestionList(listOfQuestions.questions);

            if (roleNumber === 1) {
                setIconType1(artistLogo1);
                setIconType2(artistLogo2);
                setIconTypeWhite(artistLogoWhite);
                setRoleName(Translate.t('Home.Artist'));
            }
            if (roleNumber === 2) {
                setIconType1(contentCreator1);
                setIconType2(contentCreator2);
                setIconTypeWhite(contentCreatorWhite);
                setRoleName(Translate.t('Home.ContentCreator'));
            }
            if (roleNumber === 3) {
                setIconType1(storyteller1);
                setIconType2(storyteller2);
                setIconTypeWhite(storytellerWhite);
                setRoleName(Translate.t('Home.StoryTeller'));
            }
            if (roleNumber === 4) {
                setIconType1(Flipper1);
                setIconType2(Flipper2);
                setIconTypeWhite(FlipperWhite);
                setRoleName(Translate.t('Home.Flipper'));
            }
            if (roleNumber === 5) {
                setIconType1(Esports1);
                setIconType2(Esports2);
                setIconTypeWhite(EsportsWhite);
                setRoleName(Translate.t('Home.Esports'));
            }
            if (roleNumber === 6) {
                setIconType1(Entrepreneur1);
                setIconType2(Entrepreneur2);
                setIconTypeWhite(EntrepreneurWhite);
                setRoleName(Translate.t('Home.Business'));
            }
            if (roleNumber === 7) {
                setIconType1(Builder1);
                setIconType2(Builder2);
                setIconTypeWhite(BuilderWhite);
                setRoleName(Translate.t('Home.Builder'));
            }
            if (roleNumber === 8) {
                setIconType1(ImLost1);
                setIconType2(ImLost2);
                setIconTypeWhite(ImLostWhite);
                setRoleName(Translate.t('Home.ImLost'));
            }
        }
    }, [getRoleNumber, roleNumber, answerSuccess]);

    const getRoleNumberFunction = () => {
        const role = useLocationstate.state as NavParams;
        if ((role !== null) && (role !== undefined)) {
            setRoleNumber(role.roleNumber);
        } else {
            NavActions.navToSelectRole();
        }
    };

    const submitAnswer = (params: AnswerParams) => {
        answerAttempt(params);
    };

    const handleBackButton = () => {
        if (counter === 1) { // question 1
            NavActions.navBack();
        } else {
            setCounter(counter - 1);
        }
    };

    return (
        <MainContainer
            key='question'
            initial='pageInitial'
            animate='pageIn'
            exit='pageOut'
            transition={Animation.Transition}
            variants={Animation.Variants}
        >
            <VideoBackground src={VideoScreen3} onBack={handleBackButton} />
            <Wrapper>
                <QuestionRoleContainer>
                    {roleName}
                    <WhitelineContainer />
                    Q
                    {counter}
                </QuestionRoleContainer>
                <QuestionProgressContainerMain>
                    <QuestionProgressContainerMainIcon>
                        {questionList.map((item, index) => (
                            <ProgressBar
                                icon1={iconType1}
                                icon2={iconType2}
                                whiteIcon={iconTypeWhite}
                                totalIndex={questionList.length}
                                assignedIndex={index + 1}
                                onClick={(newCounter) => setCounter(newCounter)}
                            />
                        ))}
                    </QuestionProgressContainerMainIcon>
                </QuestionProgressContainerMain>

                <AnimatePresence initial={false} exitBeforeEnter>
                    <RightBodyContainerMain
                        key={`question${counter}`}
                        initial='slideUpInitial'
                        animate='slideUp'
                        exit='slideUpOut'
                        transition={Animation.Transition}
                        variants={Animation.Variants}
                    >
                        <RightInnerContainer>
                            <QuestionContainer
                                currentQuestionIndex={counter}
                                questionList={questionList}
                                isLastQuestion={counter === (questionList.length)}
                                loading={answerQuestionAttempting}
                                error={answerError}
                                onSubmit={submitAnswer}
                                skipQuestion={() => setCounter(counter + 1)}
                            />
                        </RightInnerContainer>
                    </RightBodyContainerMain>
                </AnimatePresence>
            </Wrapper>
        </MainContainer>
    );
};

const WhitelineContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 2px;
    margin-left: 5px;
    margin-right: 5px;
    max-width: 150px;
    max-height: 30px;
    overflow: hidden;
    z-index: 3;
    background-color: white;
`;

const QuestionRoleContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;

    max-height: 20px;
    overflow: hidden;
    top: 6.5%;
    right: 10%;

    font-family: ${FontUtil.primary};
    color: white;

    position: absolute;
    z-index: 3;

    justify-content: flex-end;

    @media (max-width: 540px) {
        top: 10%;
        width: 100%;
        height: 100%;
        max-height: 20px;

        right: 0%;

        justify-content: center;
    }
`;

const RightBodyContainerMain = styled(motion.div)`
    display: flex;
    margin-top: 5%;
    width: 100%;

    justify-content: center;
    align-items: center;

    @media (max-width: 800px) {
        width: 70%;

        padding-left: 5%;
        margin-top: 10%;
    }

    @media (max-width: 680px) {
        margin-top: 15%;
    }

    @media (max-width: 640px) {
        width: 80%;
    }

    @media (max-width: 540px) {
        margin-top: 20%;
        width: 100%;
        padding-right: 5%;
    }

    @media (max-width: 480px) {
        margin-top: 25%;
    }

    @media (max-width: 420px) {
        margin-top: 28%;
    }

    @media (max-width: 360px) {
        margin-top: 30%;
    }
`;

const RightInnerContainer = styled.div`
    display: flex;

    width: 100%;
    margin-top: -60px;

    justify-content: space-between;

    @media (max-width: 800px) {
        display: flex;
        flex-direction: column-reverse;
        width: 100%;

        margin-top: 10%;

        justify-content: flex-end;
        align-items: center;
    }
`;

const QuestionProgressContainerMainIcon = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;

    overflow: hidden;

    @media((min-width: 350px) and(max-width: 600px)) {
        background: transparent;
        width: 100%;
    }
`;

const MainContainer = styled(motion.div)`
    display: flex;
    width: 100%;

    position: absolute;
    z-index: 3;
`;

const Wrapper = styled.div`
    display: flex;
    width: 100%;

    padding-left: 70px;
    padding-right: 70px;

    @media (max-width: 960px) {
        padding-left: 50px;
        padding-right: 50px;
    }

    @media (max-width: 768px) {
        padding-left: 20px;
        padding-right: 20px;
    }

    @media (max-width: 540px) {
        padding-left: 10px;
        padding-right: 10px;
    }
`;

const QuestionProgressContainerMain = styled.div`
    display: flex;

    height: 100vh;
    justify-content: center;
    align-items: center;
    justify-content: end;

    background: transparent;
`;

/* this leaving here if in future wants to use svg */
const StyledIconSvg = styled(SVG)`
    justify-self: center;
    justify-content: center;
    justify-items: center;
    align-items: center;
    max-width: 50px;
    max-height: 100px;
    color: #2F80ED;
`;

const mapStateToProps = (state: RootState) => ({
    getRoleNumber: Selectors.getHomeRoleNumber(state),
    answerQuestionAttempting: Selectors.homeAnswerAttempting(state),
    answerError: Selectors.homeAnswerError(state),
    answerSuccess: Selectors.homeAnswerSuccess(state),
    counter: Selectors.homeSetCounterData(state),

});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    answerAttempt: (data: AnswerParams) =>
        dispatch(Actions.homeAnswerAttempt(data)),
    setCounter: (state: number) =>
        dispatch(Actions.setCounter(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Answer);
