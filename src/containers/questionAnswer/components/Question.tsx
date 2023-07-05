import React, { useState } from 'react';
import { connect } from 'react-redux';

import styled from 'styled-components';
import Dompurify from 'dompurify';
import Translate from 'lib/Translate';
import FontUtil from 'lib/Font';

import Button from 'components/common/Button';
import { Question, QuestionTypeEnum } from 'entities/questions';

import Selectors from 'redux/Selectors';
import { RootState } from 'redux/store';
import { AnswerInput } from 'redux/slices/home/types';

interface AnswerParams {
    index: number;
    answer: string;
    answerFile: File | null;
    questionType: QuestionTypeEnum;
    isLastQuestion: boolean;
}

interface Props {
    currentQuestionIndex: number;
    questionList: Question[];
    isLastQuestion: boolean;
    onSubmit(params: AnswerParams): void;
    skipQuestion(): void;

    loading: boolean;
    error: string;
    answerInputs: AnswerInput[];
}

const QuestionContainer = (props: Props): JSX.Element | null => {
    const {
        currentQuestionIndex, questionList, isLastQuestion, onSubmit, loading, error, skipQuestion, answerInputs,
    } = props;

    if (!questionList || !questionList.length) {
        return null;
    }

    const { questionEn, questionIndex, type } = questionList[currentQuestionIndex - 1];

    let defaultAnswer = '';
    let defaultAnswerFileName = '';

    const answerInReduxIndex = answerInputs.findIndex((item) => item.index === questionIndex);
    if (answerInReduxIndex >= 0) {
        defaultAnswer = answerInputs[answerInReduxIndex].answer;
        defaultAnswerFileName = answerInputs[answerInReduxIndex].fileName || '';
    }

    const [answer, setAnswer] = useState(defaultAnswer);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [uploadedFileName, setUploadedFileName] = useState(defaultAnswerFileName);

    const handleFileAttached = (event: React.FormEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;

        if (target.files) {
            setUploadedFile(target.files[0]);
            setUploadedFileName(target.files[0].name);
        }
    };

    const handleSubmit = () => {
        if (loading) return;

        onSubmit({
            index: currentQuestionIndex,
            answer,
            questionType: type,
            answerFile: uploadedFile,
            isLastQuestion,
        });
    };

    const renderError = () => {
        if (error) return <ErrorMsg>{error}</ErrorMsg>;
        return null;
    };

    const renderQuestion = () => {
        if (type === QuestionTypeEnum.Upload) {
            return (
                <FormContainer>
                    {uploadedFileName && (
                        <ErrorMsg>
                            {Translate.t('Question.fileName')}
                            : &nbsp;
                            {uploadedFileName}
                        </ErrorMsg>
                    )}
                    <ButtonWrap>
                        <LabelContainerFile htmlFor='fileInput'>
                            {Translate.t('Question.upload')}
                            <input id='fileInput' onChange={handleFileAttached} type='file' className='file' style={{ display: 'none' }} />
                        </LabelContainerFile>
                    </ButtonWrap>
                    <SubmitContainer>
                        <Button
                            onClick={handleSubmit}
                            label={Translate.t('Question.submit')}
                            style={{ justifyContent: 'flex-start', marginTop: 10 }}
                            wrapperStyle={{ width: 180, height: 55 }}
                        />
                        {renderError()}
                    </SubmitContainer>
                </FormContainer>
            );
        }

        if (type === QuestionTypeEnum.Text || type === QuestionTypeEnum.None) {
            return (
                <SubmitContainer>
                    <Button
                        label={Translate.t('Home.Next')}
                        onClick={handleSubmit}
                        loading={loading}
                        style={{ justifyContent: 'flex-start', marginTop: 10 }}
                        wrapperStyle={{ width: 180, height: 55 }}
                    />
                    {error && (
                        <InvalidContainerMain>
                            {error}
                        </InvalidContainerMain>
                    )}
                </SubmitContainer>
            );
        }

        return null;
    };

    const renderAnswerInput = () => {
        if (type === QuestionTypeEnum.None) return null;

        return (
            <AnswerBodyContainerMain>
                <AnswerContainer>
                    <AnswerContainerInput
                        value={answer}
                        placeholder={Translate.t('Question.placeholder')}
                        onChange={e => setAnswer(e.target.value)}
                    >
                        <div
                            style={{ display: 'flex', height: '100%', width: '100%', backgroundColor: 'black', opacity: '100%' }}
                        >
                            {answer}
                        </div>
                    </AnswerContainerInput>
                </AnswerContainer>
            </AnswerBodyContainerMain>
        );
    };

    const sanitizedHtml = Dompurify.sanitize(questionEn);

    let questionCopy = `${Translate.t('Home.Question')} ${questionIndex}`;
    if (type === QuestionTypeEnum.None) questionCopy = 'Co-Founder Statement';

    return (
        <>
            <QuestionBodyContainerMain>
                <QuestionWrapper>
                    <QuestionNumberContainer>
                        {questionCopy}
                    </QuestionNumberContainer>
                    <QuestionMainContainer dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
                </QuestionWrapper>

                {renderQuestion()}
            </QuestionBodyContainerMain>

            {renderAnswerInput()}
        </>
    );
};

const QuestionBodyContainerMain = styled.div`
    margin-left: 25px;

    display: flex;
    flex-direction: column;
    flex: 1;
    
    justify-content: space-between;
    border: none;

    @media(max-width: 800px) {
        margin-left: 0px;
        margin-right: 0px;
        margin-top: 20px;
        margin-bottom: 20px;

        width: 100%;
    }
`;

const QuestionWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const QuestionNumberContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    color: white;
    font-family: ${FontUtil.primary};
    font-weight: 700;
    font-size: 24px;
    line-height: 26px;

    @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
        font-weight: 600;
        font-size: 18px;
        line-height: 22px;
    }

    @media (max-width: 480px) {
        font-size: 16px;
    }
`;

const QuestionMainContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 99%;
    justify-content: start;
    color: white;
    margin-top: 20px;
    font-weight: 700;
    font-size: 18px;
    line-height: 25px;
    font-family: ${FontUtil.primary};

    @media (max-width: 768px ) {
        margin-top: 10px;
        font-weight: 700;
        font-size: 16px;
        line-height: 25px;
    }

    @media (max-width: 480px) {
        font-size: 14px;
    }

    @media ((min-width: 800px ) and (max-width: 1200px )) {
        margin-top: 10px;
        font-weight: 700;
        font-size: 16px;
        line-height: 25px;
    }
`;

const FormContainer = styled.div`
    color: white;
    width: 100%;

    @media (max-width: 800px) {
        margin-top: 20px;
    }
`;

const ButtonWrap = styled.div`
    display: flex;
    border: none;
    margin-top: 10px;

    background: transparent;

    width: 180px;
    height: 55px;
`;

const LabelContainerFile = styled.label`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    border-radius: 19px;
    
    color: white;
    text-transform: uppercase;
    font-family: ${FontUtil.primary};

    justify-content: center;
    align-items: center;

    font-weight: 700;
    font-size: 24px;
    line-height: 26px;
    cursor: pointer;
    z-index: 1;

    overflow: hidden;
    transition: all .3s;
    position: relative;

    background: transparent linear-gradient(180deg, #337DFF 0%, #3384FD 13%, #3599F7 32%, #37BBEE 55%, #3AEBE2 82%, #3CFDDE 91%) 0% 0% no-repeat padding-box;

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
        background: linear-gradient(#FE3D6C 0%, #FC9995 100%);
        top: 0;
        left: 0;
        height: 0%;
        width: 100%;
        transition: all .3s;
        z-index: -1;
    }
            
    &:hover {
        color: #fff;
        &:before {
            height: 100%;
        }
    }

    @media (max-width: 768px) {
        font-size: 22px;
    }
`;

const ErrorMsg = styled.p`
    display: flex;
    font-family: ${FontUtil.primary};
    margin-top: 10px;
    color: yellow;

    width: 100%;
    text-align: start;

    @media (max-width: 768px) {
        margin-top: 12px;
        font-size: 14px;
    }
`;

const SubmitContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const InvalidContainerMain = styled.p`
    display: flex;
    font-family: ${FontUtil.primary};
    margin-top: 10px;
    color: yellow;

    width: 100%;
    text-align: left;

    padding-botom: 20px;

    @media (max-width: 768px) {
        margin-top: 12px;
        font-size: 14px;
    }
`;

const AnswerContainer = styled.div`
    margin: 0px;
    display: block;
    width: 100%;
    height: 50vh;
    overflow: hidden;

    border-radius: 19px;

    position: relative;

    &:before {
        content: "";
        opacity: 0.7;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

        background: #3FD7FB4D 0% 0% no-repeat padding-box;

        pointer-events: none;
    }

    @media (max-width: 800px ) {
        width: 100%;
        height: 30vh;
    }
`;

const AnswerContainerInput = styled.textarea`
    display: block;

    text-align: left;
    text-align: start;
    
    font-weight: 700;
    font-size: 20px;
    line-height: 26px;

    background: transparent;
    opacity: 1;

    padding: 5%;
    height: 100%;
    width: 100%;

    color: white;
    border: none;
    outline: none;

    font-family: montserrat-medium;
    
    &::placeholder {
        color: #ffffff;
    }

    @media (max-width: 1024px) {
        padding: 10%;
    }

    @media (max-width: 799px) {
        width: 100%;
        height: 30vh;

        font-size: 18px;
    }

    @media (max-width: 540px) {
        font-size: 14px;
        line-height: 24px;
    }
`;

const AnswerBodyContainerMain = styled.div`
    display: flex;
    flex: 1;
    overflow: hidden;
    justify-content: center;

    @media (max-width: 800px) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
    }

    @media(max-width: 540px) {
        width: 100%;
        justify-content: end;
        padding-bottom: 20px;
    }
`;

const mapStateToProps = (state: RootState) => ({
    answerInputs: Selectors.homeGetAnswerInput(state),
});

export default connect(mapStateToProps)(QuestionContainer);
