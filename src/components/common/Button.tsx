import React from 'react';
import { Oval } from 'react-loader-spinner';
import styled from 'styled-components';

import FontUtil from 'lib/Font';

interface ButtonProps {
    label: string;
    onClick: () => void;

    style?: any;
    innerButtonStyle?: any;
    wrapperStyle?: any;
    loading?: boolean;
}

const Button = (props: ButtonProps): JSX.Element => {
    const {
        label,
        onClick,
        style,
        wrapperStyle,
        innerButtonStyle,
        loading,
    } = props;

    const renderBody = () => {
        if (loading) {
            return (
                <Oval
                    height={20}
                    width={20}
                    color='#ffff'
                    secondaryColor='#ffff'
                />
            );
        }

        return label;
    };

    return (
        <Container style={style}>
            <Wrap style={wrapperStyle}>
                <ButtonContainer onClickCapture={onClick} style={innerButtonStyle}>
                    {renderBody()}
                </ButtonContainer>
            </Wrap>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    justify-content: center;
    cursor: pointer;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    
    background: transparent linear-gradient(180deg, #337DFF 0%, #3384FD 13%, #3599F7 32%, #37BBEE 55%, #3AEBE2 82%, #3CFDDE 91%) 0% 0% no-repeat padding-box;
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

    @media (max-width: 768px) {
        font-size: 22px;
    }
`;

const Wrap = styled.button`
    display: flex;
    border: none;
    margin-top: 10px;

    background: transparent;

    width: 200px;
    height: 60px;

    padding: 0;

    @media(max-width: 768px) {
        width: 160px;
        height: 50px;   
    }
`;

Button.defaultProps = {
    style: {},
    innerButtonStyle: {},
    wrapperStyle: {},
    loading: false,
};

export default Button;
