import React, { useRef, FunctionComponent, useEffect, useState, SyntheticEvent } from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';

import { Oval } from 'react-loader-spinner';
import { AnimatePresence, motion } from 'framer-motion';
import Slider from 'react-slider';
import { useMediaQuery } from 'react-responsive';

import Translate from 'lib/Translate';

import Selectors from 'redux/Selectors';
import Actions from 'redux/Actions';
import { AppDispatch, RootState } from 'redux/store';

import RoleList from 'lib/LOV/RoleList';
import NavActions from 'lib/NavActions';
import Animation from 'lib/Animation';
import FontUtil from 'lib/Font';
import Utils from 'lib/Utils';

import TrailerVideo from 'assets/videos/TrailerVideo.mp4';
import TrailerVideoZh from 'assets/videos/TrailerVideo-zh.mp4';
import TrailerVideoKr from 'assets/videos/TrailerVideo-kr.mp4';
import TrailerVideoJp from 'assets/videos/TrailerVideo-jp.mp4';

import VolumeUp from 'assets/Images/volume-up.png';
import VolumeDown from 'assets/Images/volume-down.png';

import Button from 'components/common/Button';

const TIMESTAMP_FOR_ICONS = 75;

interface videoJsProps {
    roleSelectAttempting: boolean,
    roleSelectAttemptFunction: (roleSelected: number) => void;
}

interface Role {
    index: number;
    icon: string;
    coloredIcon: string;
    label: string;
}

const VideoJS: FunctionComponent<videoJsProps> = (props: videoJsProps) => {
    const { roleSelectAttempting, roleSelectAttemptFunction } = props;
    const [showRoleList, setShowRoleList] = useState(false);
    const [clicks, setClicks] = useState(0);
    const [volume, setVolume] = useState(15);

    const isMobile = useMediaQuery({ maxWidth: 1024 });

    const language = localStorage.getItem('selectedLanguage');

    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        const submissionId = sessionStorage.getItem('submissionIdStore');
        if (!submissionId) NavActions.navToHome();
    }, []);

    const onSetVideoTimestamp = (event: SyntheticEvent<HTMLVideoElement, Event>) => {
        if (event.currentTarget.currentTime > TIMESTAMP_FOR_ICONS) {
            setShowRoleList(true);
            Utils.Video.setVideoWatched();
        }
    };

    const handleUnmute = () => {
        setClicks(clicks + 1);
        if (videoRef && videoRef.current) {
            videoRef.current.volume = volume / 100;
            videoRef.current.muted = !videoRef.current.muted;
        }
    };

    const onVolumeChange = (vol: number) => {
        setVolume(vol as number);

        if (videoRef && videoRef.current) {
            videoRef.current.volume = vol / 100;
        }
    };

    const renderBottomContent = () => {
        const videoWatched = Utils.Video.getVideoWatched();

        if (videoWatched || showRoleList) {
            return (
                <ButtonContainerMain
                    key='roleList'
                    initial='slideUpInitial'
                    animate='slideUp'
                    exit='slideUpOut'
                    transition={Animation.Transition}
                    variants={Animation.Variants}
                >

                    {roleSelectAttempting ? (
                        <LoaderCenterContainer>
                            <Oval
                                height={40}
                                width={40}
                                color='#ffff'
                                secondaryColor='#ffff'
                            />
                        </LoaderCenterContainer>
                    ) : (RoleList.map(item => renderButton(item)))}

                </ButtonContainerMain>
            );
        }

        return (
            <MuteContainer>
                <UnmuteText>
                    {Translate.t('Home.muteUnmute')}
                </UnmuteText>
                {clicks >= 10 && (
                    <Button
                        label='Skip'
                        onClick={() => setShowRoleList(true)}
                        wrapperStyle={{ width: 180, height: 50 }}
                    />
                )}
            </MuteContainer>
        );
    };

    const renderButton = (item: Role) => {
        const { icon, coloredIcon, index, label } = item;

        const renderBody = () => {
            return (
                <RoleNameContainer>
                    <ImagesContainer>
                        <RoleIcon
                            src={icon}
                            coloredSrc={coloredIcon}
                        />
                        <ButtonLabel>{label}</ButtonLabel>
                    </ImagesContainer>
                </RoleNameContainer>
            );
        };

        return (
            <ButtonMainContainer onClick={() => roleSelectAttemptFunction(index)}>
                {renderBody()}
            </ButtonMainContainer>
        );
    };

    const renderVolumeTrack = ((sliderProps: any, state: {
        index: number;
        value: number | readonly number[];
    }) => {
        return (
            <SliderTrack {...sliderProps} index={state.index} />
        );
    });

    const renderSliderThumb = ((sliderProps: any) => {
        return (
            <SliderThumb {...sliderProps} />
        );
    });

    let videoSrc = TrailerVideo;

    switch (language) {
        case 'cn': videoSrc = TrailerVideoZh; break;
        case 'jp': videoSrc = TrailerVideoJp; break;
        case 'kr': videoSrc = TrailerVideoKr; break;
        default: videoSrc = TrailerVideo;
    }

    return (
        <Container>
            <MainVideoContainer key='mainVideoContainer' layout>
                <VideoJsMainContainerSetFlex>
                    <VideoContainer
                        id='myVid'
                        width='320'
                        height='240'
                        autoPlay
                        muted
                        playsInline
                        ref={videoRef}
                        onTimeUpdate={onSetVideoTimestamp}
                        disablePictureInPicture
                        onClick={handleUnmute}
                    >
                        <source src={videoSrc} type='video/mp4' />
                    </VideoContainer>

                    <VolumeContainer>
                        <VolumeUpImage src={VolumeUp} />
                        <SliderComponent
                            renderThumb={renderSliderThumb}
                            orientation={isMobile ? 'horizontal' : 'vertical'}
                            value={volume}
                            onChange={(vol) => onVolumeChange(vol as number)}
                            renderTrack={renderVolumeTrack}
                            invert={!isMobile}
                        />
                        <VolumeDownImage src={VolumeDown} />
                    </VolumeContainer>
                </VideoJsMainContainerSetFlex>

            </MainVideoContainer>

            <AnimatePresence exitBeforeEnter>
                <EmptyContainer>
                    {renderBottomContent()}
                </EmptyContainer>
            </AnimatePresence>
        </Container>
    );
};

const Container = styled.div`
    height: 100%;
    align-items: 'center'; 
    display: flex; 
    flex-direction: column;
`;

const EmptyContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;

    align-items: center;
    font-family: ${FontUtil.primary};

    color: white;
    width: 100vw;

    padding-bottom: 20px;

    flex: 1;
`;

const RoleNameContainer = styled.div`
    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
`;

const VideoContainer = styled.video`
    width: 100%;
    height: 100%;
    
    z-index: 1;

    box-shadow:
        inset 0 0 50px #fff,
        inset 20px 0 80px #2F80FF,
        inset -20px 0 80px #3FFBE0,
        inset 20px 0 300px #2F80FF,
        inset -20px 0 300px #3FFBE0,
        0 0 50px #fff,
        -10px 0 80px #2F80FF,
        10px 0 80px #3FFBE0;
`;

const RoleIcon = styled.div<{ src: string, coloredSrc: string }>`
    height: 70px;
    width: 70px;

    ${props => props.src && css`
        background-image: url('${props.src}');

        background-size: contain;
        background-repeat: no-repeat;
        background-position-x: center;
        background-position-y: center;

        &:hover {
            background-image: url('${props.coloredSrc}');
        }
    `}

    @media (max-width: 1024px) {
        height: 60px;
        width: 60px;
    }

    @media (max-width: 768px) {
        width: 56px;
        height: 56px;
    }

    @media (max-width: 540px) {
        width: 56px;
        height: 56px;
    }
`;

const ImagesContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    color: white;

    flex-direction: column;

    @media ((min-width: 350px) and (max-width: 800px) ) {
        width: 100%;
        height: 100%;
    }

    @media ((min-width: 900px)  ) {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50%;
    }
`;

const MuteContainer = styled.div`
    display: flex;
    flex-direction: column;

    margin-top: 0px;

    @media (max-width: 768px) {
        margin-top: -40px;
    }

    @media (max-width: 540px) {
        margin-top: -70px;
    }
`;

const LoaderCenterContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const MainVideoContainer = styled(motion.div)`
  width: 100%;
  display: flex;

  justify-content: center;
  align-items: center;

  flex: 4;
`;

const ButtonMainContainer = styled.button`
    display: flex;
    background-color: transparent;
    border: none;

    flex: 1 0 12.5%;

    @media (max-width: 768px) {
        flex: 1 0 25%;
    }
`;

const ButtonContainerMain = styled(motion.button)`
    display: flex;
    flex-direction: row;
    justify-content: center;

    background: transparent;

    border: none;
    width: 80vw;
    height: 100%;

    flex-wrap: wrap;

    margin-top: -40px;

    @media (max-width: 1024px) {
      width: 100vw;
      height: 100%;
    }

    @media (max-width: 768px) {
        margin-top: -120px;
    }
`;

const ButtonLabel = styled.text`
    font-size: 12px;
    text-align: center;

    line-height: 12px;

    align-items: center;
    font-family: ${FontUtil.primary};
    color: white;

    margin-top: 4px;

    @media (max-width: 1024px) {
        font-size: 12px;
    }

    @media (max-width: 768px) {
        font-size: 12px;
    }
`;

const VideoJsMainContainerSetFlex = styled.div`
    display: flex;
    width: 57%;

    align-items: flex-end;
    flex-direction: row;

    border-width: 10px;
    border-color: red;

    @media (max-width: 1024px) {
        width: 100%;
    }

    @media (max-width: 1024px) {
        flex-direction: column;
    }
`;

const UnmuteText = styled.text`
    font-size: 16px;
    text-align: center;

    margin-left: 8px;
    margin-right: 8px;
`;

const VolumeContainer = styled.div`
    margin-left: 10px;

    z-index: 3;

    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 1024px) {
        margin-right: 10px;
        margin-left: 0px;

        margin-top: 10px;

        flex-direction: row;
    }
`;

const VolumeUpImage = styled.img`
    height: 10px;
    width: 10px;
    margin-bottom: 8px;

    @media (max-width: 1024px) {
        margin-right: 8px;
        margin-bottom: 0px;
    }
`;

const VolumeDownImage = styled.img`
    height: 10px;
    width: 10px;
    margin-top: 8px;

    @media (max-width: 1024px) {
        margin-left: 8px;
        margin-top: 0px;
    }
`;

const SliderComponent = styled(Slider)`
    height: 100px;
    width: 5px;

    @media (max-width: 1024px) {
        width: 100px;
        height: 5px;
    }
`;

const SliderTrack = styled.div<{ index: number }>`
    top: 0;
    bottom: 0;
    background: ${props => (props.index === 1 ? 'white' : '#1eff00')};
    border-radius: 999px;

    width: 5px;

    @media (max-width: 1024px) {
        width: auto;
        height: 5px;
    }
`;

const SliderThumb = styled.div`
    height: 15px;
    width: 15px;
    background-color: #000;
    color: #fff;
    border-radius: 50%;
    cursor: grab;

    position: absolute;
    left: -5px;

    @media (max-width: 1024px) {
        left: 0px;
        top: -5px;
    }
`;

const mapStateToProps = (state: RootState) => ({
    roleSelectAttempting: Selectors.homeRoleSelectAttempting(state),
    roleSelectError: Selectors.homeRoleSelectError(state),
    roleSelectSuccess: Selectors.homeRoleSelectSuccess(state),
    getReferralId: Selectors.homeGetReferralKeySuccess(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    roleSelectAttemptFunction: (roleSelected: number) =>
        dispatch(Actions.homeRoleSelectAttempt({ roleSelected })),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoJS);
