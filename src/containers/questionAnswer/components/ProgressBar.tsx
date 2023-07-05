import React from 'react';
import { connect } from 'react-redux';

import styled, { css } from 'styled-components';

import Selectors from 'redux/Selectors';
import { RootState } from 'redux/store';
import { AnswerInput } from 'redux/slices/home/types';

interface Props {
    assignedIndex: number;
    totalIndex: number;

    icon1: string;
    icon2: string;
    whiteIcon: string;

    onClick(index: number): void;

    answers: AnswerInput[];
}

const ProgressBar = (props: Props): JSX.Element => {
    const {
        assignedIndex,
        totalIndex,
        onClick,

        icon1,
        icon2,
        whiteIcon,

        answers,
    } = props;

    const isLast = assignedIndex === totalIndex;

    const isMyQuestionAnswered = answers.find((item) => item.index === assignedIndex);

    const usersFurthestProgress = answers.length + 1;

    let icon = icon1;
    if (usersFurthestProgress === assignedIndex) icon = icon1;
    else if (!isMyQuestionAnswered) icon = whiteIcon;
    else icon = icon2;

    const isDisabled = usersFurthestProgress < assignedIndex;

    const handleClick = () => {
        if (!isDisabled) onClick(assignedIndex);
    };

    return (
        <ProgressIconContainer>
            <StyledIcon src={icon} onClick={handleClick} disabled={isDisabled} />
            {isLast ? (<TransparentProgressLineContainer />) : <ProgressLineContainer />}
        </ProgressIconContainer>
    );
};

const ProgressIconContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 10%;
    margin-top: 8px;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
`;

const StyledIcon = styled.img<{ disabled?: boolean }>`
    object-fit: contain;

    width: 50px;
    height: 50px;

    cursor: pointer;
    background-color: transparent;

    ${props => props.disabled && css`
        cursor: default;
    `}

    @media (max-width: 900px) {
        width: 45px;
        height: 45px;
    }

    @media (max-width: 768px) {
        width: 40px;
        height: 40px;
    }

    @media (max-width: 349px) {
        width: 35px;
        height: 35px;
    }
`;

const TransparentProgressLineContainer = styled.div`
    display: flex;
    margin-top: 10px;
    width: 1.5%;
    height: 40px;
    background-color: transparent;

    @media((min-width: 250px) and (max-width: 349px) ) {
        display: none;
    }
`;

const ProgressLineContainer = styled.div`
    display: flex;
    margin-top: 10px;
    width: 1.5%;
    height: 40px;
    background-color: white;

    @media((min-width: 250px) and (max-width: 349px) ) {
        display: none;
    }
`;

const mapStateToProps = (state: RootState) => ({
    answers: Selectors.homeGetAnswerInput(state),
});

export default connect(mapStateToProps)(ProgressBar);
