import React from 'react';
import styled from 'styled-components';
import SVG from 'react-inlinesvg';

import Icons from 'assets/icons';

import FontUtils from 'lib/Font';
import Translate from 'lib/Translate';

const FollowUsCol = (): JSX.Element => {
    return (
        <LogoContainer>
            <FollowUsText>
                {Translate.t('ThankYou.followUs')}
            </FollowUsText>
            <RedirectContainer href='https://discord.com/invite/avium'>
                <IconContainer src={Icons.DiscordWhite} />
            </RedirectContainer>

            <RedirectContainer href='https://twitter.com/AviumOrigins'>
                <IconContainer src={Icons.TwitterWhite} />
            </RedirectContainer>

            <RedirectContainer href='https://opensea.io/collection/avium-founders-pass'>
                <IconContainer src={Icons.OpenseaWhite} />
            </RedirectContainer>
        </LogoContainer>
    );
};

const LogoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    margin-right: 60px;

    @media (max-width: 1024px) {
        margin-right: 40px;
    }

    @media (max-width: 540px) {
        margin-right: 0px;

        flex-direction: row;
        margin-bottom: 30px;
    }
`;

const RedirectContainer = styled.a`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 10px 0px;

    @media (max-width: 540px) {
        margin: 0px 10px;
    }
`;

const IconContainer = styled(SVG)`
    height: 24px;
    width: 24px;
`;

const FollowUsText = styled.div`
    font-family: ${FontUtils.primary};
    font-size: 17px;
    margin: 40px 0px 20px 0px;

    color: white;

    writing-mode: vertical-rl;

    @media (max-width: 540px) {
        writing-mode: inherit;
        font-size: 14px;

        margin: 0px 20px 0px 0px;
    }
`;

export default FollowUsCol;
