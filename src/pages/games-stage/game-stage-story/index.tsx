import { Box } from '@mui/material';
import GameAppBar from '../../../components/game-appbar';
import { appConfig } from '../../../configs/AppConfig';
import HangingBar from '../components/HangingBar';
import { useGameStage } from '../hook/GameStageProvider';
import StorySwiper from './components/StorySwiper';
import SwiperNavigation from './components/SwiperNavigation';
import { useEffect } from 'react';
import { useBackdropContext } from '../../../providers/BackdropProvider';

const cloudAnimation = {
    '@keyframes moveCloud': {
        '0%': {
            transform: 'translateX(100vw)',
            opacity: 0,
        },
        '10%': {
            transform: 'translateX(80vw)',
            opacity: 1,
        },
        '90%': {
            transform: 'translateX(-80vw)',
            opacity: 1,
        },
        '100%': {
            transform: 'translateX(-100vw)',
            opacity: 0,
        },
    },
    '@keyframes twinkle': {
        '0%': { opacity: 0 },
        '30%': { opacity: 0.5 },
        '50%': { opacity: 1 },
        '70%': { opacity: 0.5 },
        '100%': { opacity: 0 },
    },
};

export default function GameStageStoryPage() {
    const { listStages, isLoadingStages } = useGameStage();
    const { showBackdrop, hideBackdrop } = useBackdropContext();

    useEffect(() => {
        if (isLoadingStages) {
            showBackdrop();
        } else {
            hideBackdrop();
        }

        return () => {
            hideBackdrop();
        };
    }, [isLoadingStages, showBackdrop, hideBackdrop]);

    return (
        <Box position={'relative'}>
            {[...Array(7)].map((_, index) => {
                const size = 16 + Math.random() * 12;
                return (
                    <Box
                        key={index}
                        sx={{
                            position: 'absolute',
                            width: `${size}px`,
                            height: `${size}px`,
                            top: `${Math.random() * 40}%`,
                            left: `${10 + Math.random() * 80}%`,
                            animation: 'twinkle 10s infinite',
                            animationDelay: `${Math.random() * 10}s`,
                            '&::before, &::after': {
                                content: '""',
                                position: 'absolute',
                                backgroundColor: 'white',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                            },
                            '&::before': {
                                width: '35%',
                                height: '100%',
                                clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                            },
                            '&::after': {
                                width: '100%',
                                height: '35%',
                                clipPath: 'polygon(0% 50%, 50% 0%, 100% 50%, 50% 100%)',
                            },
                        }}
                    />
                );
            })}
            <Box
                sx={{
                    width: '100%',
                    height: '50vh',
                    backgroundImage: `
            linear-gradient(to top, rgba(127, 166, 174, 0.2),rgba(255, 255, 255, 0) 50%),
            url('${appConfig.url.pathStaticMedia}/story-mode-background.3516b441.svg')
        `,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <GameAppBar />
                <HangingBar label="Story" />
            </Box>
            <Box
                sx={{
                    width: '10%',
                    height: '80%',
                    backgroundImage: `url('${appConfig.url.pathStaticMedia}/fluffy-cloud.e90b60ac.svg')`,
                    position: 'absolute',
                    top: '15%',
                    left: '37%',
                    transform: 'translate(-400%)',
                    backgroundRepeat: 'no-repeat',
                }}
            />

            <Box
                sx={{
                    width: '50%',
                    height: '50%',
                    backgroundImage: `url('${appConfig.url.pathStaticMedia}/thin-cloud-1.df837918.svg')`,
                    position: 'absolute',
                    top: '10%',
                    backgroundRepeat: 'no-repeat',
                    opacity: 0,
                    animation: 'moveCloud 42s linear infinite',
                    animationDelay: '0s',
                    animationFillMode: 'backwards',
                    zIndex: 0,
                    ...cloudAnimation,
                }}
            />

            <Box
                sx={{
                    width: '50%',
                    height: '50%',
                    backgroundImage: `url('${appConfig.url.pathStaticMedia}/thin-cloud-2.7cb2495e.svg')`,
                    position: 'absolute',
                    top: '20%',
                    backgroundRepeat: 'no-repeat',
                    opacity: 0,
                    animation: 'moveCloud 42s linear infinite',
                    animationDelay: '14s',
                    animationFillMode: 'backwards',
                    zIndex: 0,
                    ...cloudAnimation,
                }}
            />

            <Box
                sx={{
                    width: '50%',
                    height: '50%',
                    backgroundImage: `url('${appConfig.url.pathStaticMedia}/thin-cloud-3.0fa47c17.svg')`,
                    position: 'absolute',
                    top: '15%',
                    backgroundRepeat: 'no-repeat',
                    opacity: 0,
                    animation: 'moveCloud 42s linear infinite',
                    animationDelay: '28s',
                    animationFillMode: 'backwards',
                    zIndex: 0,
                    ...cloudAnimation,
                }}
            />

            <Box
                sx={{
                    maxWidth: '1000px',
                    margin: '0 auto',
                    position: 'relative',
                    padding: '0 70px',
                    transform: 'translateY(-40%)',
                }}
            >
                <StorySwiper listStages={listStages} />
                <SwiperNavigation />
            </Box>
        </Box>
    );
}
