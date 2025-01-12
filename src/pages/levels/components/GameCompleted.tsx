import { Box, Fade, Stack, SxProps, Theme, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMediaQuery } from 'usehooks-ts';
import { defaultGameStats } from '..';
import GameAppBar from '../../../components/game-appbar';
import { appConfig } from '../../../configs/AppConfig';
import { useExtraSmall, useMobile, useTablet } from '../../../hooks/useResponsive';
import { ILevel } from '../../../types/backend';
import { useGameStage } from '../../games-stage/hook/GameStageProvider';
import { GameStats } from './QuestionsGame';

interface GameCompletedProps {
    gameStats: GameStats;
    levelItem?: ILevel;
    onGameStats: (value: GameStats) => void;
    onLevelItem: (value: ILevel | undefined) => void;
}

// Animation timing constants
const ANIMATION_TIMINGS = {
    PANEL_SLIDE: 1000,
    LEFT_STAR: 1000,
    CENTER_STAR: 1500,
    RIGHT_STAR: 2000,
    TEXT: 2500,
    BUTTONS: 3000,
    COIN_1: 3500,
    COIN_2: 3800,
    COIN_3: 4100,
    SHAKE_DURATION: 500,
} as const;

const ASSETS = {
    PANEL: `${appConfig.url.pathStaticMedia}/score-panel-story-long.48de2f0c.svg`,
    STAR_LEFT: `${appConfig.url.pathStaticMedia}/star-left.322db91c.svg`,
    STAR_CENTER: `${appConfig.url.pathStaticMedia}/star-center.bfc6865c.svg`,
    STAR_RIGHT: `${appConfig.url.pathStaticMedia}/star-right.32586165.svg`,
    COIN: `${appConfig.url.pathStaticMedia}/coin.432612ed.svg`,
    EXIT_BUTTON: `${appConfig.url.pathStaticMedia}/exit-button.a7b9f897.svg`,
    REPLAY_BUTTON: `${appConfig.url.pathStaticMedia}/replay-button.4c4db5f0.svg`,
    NEXT_BUTTON: `${appConfig.url.pathStaticMedia}/end-of-game-next-button.22ad70eb.svg`,
} as const;

const commonStyles = {
    backgroundContainer: {
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    backgroundImage: {
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    },
} as const;

// Component Types
interface StarProps {
    show: boolean;
    image: string;
    position: 'left' | 'center' | 'right';
    style?: React.CSSProperties;
}

interface CoinProps {
    show: boolean;
    index: number;
    style?: React.CSSProperties;
}

interface GameButtonProps {
    image: string;
    style?: SxProps<Theme>;
    onClick?: () => void;
}

const Star = ({ show, image, position, style }: StarProps) => {
    const getTransform = () => {
        switch (position) {
            case 'left':
                return show ? 'translateX(0)' : 'translateX(-200%)';
            case 'center':
                return show ? 'translateY(0)' : 'translateY(-200%)';
            case 'right':
                return show ? 'translateX(0)' : 'translateX(200%)';
        }
    };

    const isMobileS = useMediaQuery('(max-width: 320px)');
    const isMobileM = useMediaQuery('(max-width: 375px)');
    const isMobileL = useMediaQuery('(max-width: 425px)');

    return (
        <Fade in={show} timeout={500}>
            <Box
                sx={{
                    ...commonStyles.backgroundImage,
                    width: position === 'center' ? '31%' : '24%',
                    height: position === 'center' ? '75%' : '70%',
                    display: 'flex',
                    position: 'relative',
                    backgroundImage: `url('${image}')`,
                    mt: position === 'center' ? '4%' : isMobileM ? '11.2%' : isMobileL ? "10.2%" : '12.2%',
                    ml:
                        position === 'left'
                            ? isMobileS
                                ? '12.2%'
                                : isMobileM ? '16.2%' : isMobileL ? '20.2%' : "12.2%"
                            : position === 'center'
                                ? isMobileS
                                    ? '3.7%'
                                    : isMobileM ? '-0.3%' : isMobileL ? '-4.3%' : '3.7%'
                                : isMobileS
                                    ? '3.8%'
                                    : isMobileM ? '-0.2%' : isMobileL ? '-3.2%' : '3.8%',
                    opacity: show ? 1 : 0,
                    transform: getTransform(),
                    transition: 'transform 0.5s ease-out, opacity 0.5s ease-out',
                    ...style,
                }}
            />
        </Fade>
    );
};

const Coin = ({ show, index, style }: CoinProps) => (
    <Fade in={show} timeout={500}>
        <Box
            sx={{
                ...commonStyles.backgroundImage,
                position: 'absolute',
                zIndex: 3 - index,
                top: '0%',
                width: '100%',
                height: '50%',
                backgroundImage: `url('${ASSETS.COIN}')`,
                mt: `${index * 25}%`,
                ml: index === 1 ? '15%' : '0%',
                ...style,
            }}
        />
    </Fade>
);

const GameButton = ({ image, style, onClick }: GameButtonProps) => (
    <Box
        onClick={onClick}
        sx={{
            ...commonStyles.backgroundImage,
            cursor: 'pointer',
            backgroundImage: `url('${image}')`,
            width: '20%',
            height: '100%',
            '&:hover': {
                animation: 'float 1s ease-in-out infinite',
            },
            '@keyframes float': {
                '0%, 100%': { transform: 'translateY(0)' },
                '50%': { transform: 'translateY(-5px)' },
            },
            ...style,
        }}
    />
);

const getCompletionText = (rating: number): string => {
    if (rating <= 1) return 'GREAT TRY!';
    if (rating === 2) return 'AMAZING!';
    return 'AWESOME!';
};

export default function GameCompleted(props: GameCompletedProps) {
    const { gameStats, levelItem, onGameStats, onLevelItem } = props;
    const { listLevels, listStages } = useGameStage();
    const { stageId, index } = useParams();
    const navigate = useNavigate();

    const isLastLevel =
        levelItem && listLevels?.levels && levelItem.order === listLevels.levels[listLevels.levels.length - 1].order;

    const [showPanel, setShowPanel] = useState<boolean>(false);
    const [showLeftStar, setShowLeftStar] = useState<boolean>(false);
    const [showCenterStar, setShowCenterStar] = useState<boolean>(false);
    const [showRightStar, setShowRightStar] = useState<boolean>(false);
    const [showText, setShowText] = useState<boolean>(false);
    const [showButtons, setShowButtons] = useState<boolean>(false);
    const [showCoin1, setShowCoin1] = useState<boolean>(false);
    const [showCoin2, setShowCoin2] = useState<boolean>(false);
    const [showCoin3, setShowCoin3] = useState<boolean>(false);
    const [shakeKey, setShakeKey] = useState<number>(0);

    const isExtraSmall = useExtraSmall();
    const isMobile = useMobile();
    const isTablet = useTablet();
    const isMobileL = useMediaQuery('(max-width: 425px)');
    const isMobileM = useMediaQuery('(max-width: 375px)');
    const isMobileS = useMediaQuery('(max-width: 320px)');

    useEffect(() => {
        setShowPanel(true);

        const timers = [
            setTimeout(() => {
                setShowLeftStar(true);
                setShakeKey((prev) => prev + 1);
            }, ANIMATION_TIMINGS.LEFT_STAR),
            ...(gameStats.archivedStars >= 2
                ? [
                    setTimeout(() => {
                        setShowCenterStar(true);
                        setShakeKey((prev) => prev + 1);
                    }, ANIMATION_TIMINGS.CENTER_STAR),
                ]
                : []),
            ...(gameStats.archivedStars >= 3
                ? [
                    setTimeout(() => {
                        setShowRightStar(true);
                        setShakeKey((prev) => prev + 1);
                    }, ANIMATION_TIMINGS.RIGHT_STAR),
                ]
                : []),
            setTimeout(() => setShowText(true), ANIMATION_TIMINGS.TEXT),
            setTimeout(() => setShowButtons(true), ANIMATION_TIMINGS.BUTTONS),
            setTimeout(() => setShowCoin1(true), ANIMATION_TIMINGS.COIN_1),
            setTimeout(() => setShowCoin2(true), ANIMATION_TIMINGS.COIN_2),
            setTimeout(() => setShowCoin3(true), ANIMATION_TIMINGS.COIN_3),
        ];

        return () => timers.forEach(clearTimeout);
    }, [gameStats.archivedStars]);

    const getNextStage = () => {
        if (!listStages || !stageId) return null;
        const stageIdNumber = parseInt(stageId, 10);
        const currentStageIndex = listStages.findIndex((stage) => stage.id === stageIdNumber);
        return currentStageIndex < listStages.length - 1 ? listStages[currentStageIndex + 1] : null;
    };

    return (
        <Box width="100%">
            <GameAppBar />
            <Box sx={commonStyles.backgroundContainer}>
                <Box
                    width="100%"
                    left={0}
                    height={isExtraSmall ? '600px' : isMobile ? '700px' : isTablet ? '800px' : '940px'}
                    fontSize={isExtraSmall ? '30px' : isMobile ? '35px' : isTablet ? '40px' : '47px'}
                    position="absolute"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                >
                    <Box
                        sx={{
                            width: isExtraSmall ? '90%' : isMobile ? '80%' : '470.5px',
                            height: isExtraSmall ? '400px' : isMobile ? '500px' : '653.472px',
                            zIndex: 1,
                            position: 'relative',
                            ...commonStyles.backgroundImage,
                            backgroundImage: `url('${ASSETS.PANEL}')`,
                            alignItems: 'center',
                            textAlign: 'center',
                            opacity: showPanel ? 1 : 0,
                            transform: showPanel ? 'translateY(0)' : 'translateY(-100%)',
                            transition: 'transform 1s ease-out, opacity 1s ease-out',
                            ...(shakeKey > 0 && {
                                animation: `shake${shakeKey} ${ANIMATION_TIMINGS.SHAKE_DURATION}ms ease-in-out`,
                                '@keyframes shake1': {
                                    '0%, 100%': { transform: 'translateX(0)' },
                                    '25%': { transform: 'translateX(-10px)' },
                                    '75%': { transform: 'translateX(10px)' },
                                },
                                '@keyframes shake2': {
                                    '0%, 100%': { transform: 'translateX(0)' },
                                    '25%': { transform: 'translateX(-10px)' },
                                    '75%': { transform: 'translateX(10px)' },
                                },
                                '@keyframes shake3': {
                                    '0%, 100%': { transform: 'translateX(0)' },
                                    '25%': { transform: 'translateX(-10px)' },
                                    '75%': { transform: 'translateX(10px)' },
                                },
                            }),
                        }}
                    >
                        <Typography fontSize={isExtraSmall ? '.3em' : isMobile ? '.35em' : '.4em'} mt="3.8%">
                            LEVEL {levelItem?.order}
                        </Typography>
                        <Typography fontSize={isExtraSmall ? '.6em' : isMobile ? '.7em' : '.8em'} mt="5.3%">
                            COMPLETE
                        </Typography>

                        <Box
                            display="flex"
                            flexDirection="row"
                            width="90%"
                            height="26%"
                            mt={{ xs: isMobileS ? '6%' : isMobileM ? '3%' : isMobileL ? '1%' : isTablet ? '4%' : '2%' }}
                        >
                            <Star
                                show={showLeftStar && gameStats.archivedStars >= 1}
                                image={ASSETS.STAR_LEFT}
                                position="left"
                            />
                            <Star
                                show={showCenterStar && gameStats.archivedStars >= 2}
                                image={ASSETS.STAR_CENTER}
                                position="center"
                            />
                            <Star
                                show={showRightStar && gameStats.archivedStars >= 3}
                                image={ASSETS.STAR_RIGHT}
                                position="right"
                            />
                        </Box>

                        <Fade in={showText} timeout={500}>
                            <Typography fontSize="1em" color="#e5dc45" mt="2%">
                                {getCompletionText(gameStats.archivedStars)}
                            </Typography>
                        </Fade>

                        <Box position="relative" display="inline-block" mt="1.2%" textAlign="center">
                            <Fade in={showText} timeout={700}>
                                <Typography
                                    fontSize={{ xs: '40px', sm: '47.5px' }}
                                    position="relative"
                                    zIndex={2}
                                    display="inline-block"
                                    bgcolor="#274046"
                                    borderRadius=".3em"
                                    width="100%"
                                    height="100%"
                                    p={{ xs: '4px 40px', sm: '6px 56px' }}
                                    boxShadow="inset 1px 1px 0 1px #1c2f33"
                                >
                                    +{gameStats.totalGold}
                                </Typography>
                            </Fade>

                            <Box position="absolute" width="35%" height="110%" zIndex={3} bottom="-20%" left="-20%">
                                <Coin show={showCoin1} index={0} />
                                <Coin show={showCoin2} index={1} />
                                <Coin show={showCoin3} index={2} />
                            </Box>
                        </Box>

                        {!isLastLevel && (
                            <Fade in={showText} timeout={500}>
                                {gameStats.archivedStars <= 1 ? (
                                    <Typography
                                        fontSize={'.63em'}
                                        textAlign={'center'}
                                        p={'1% 8%'}
                                        mt={'7%'}
                                        color="#e5dc45"
                                    >
                                        CAN YOU ANSWER MORE QUICKLY?
                                    </Typography>
                                ) : (
                                    <Stack
                                        direction={'row'}
                                        justifyContent={'center'}
                                        spacing={1}
                                        mt={{ xs: '5%', sm: '10%', md: '8%' }}
                                        alignItems={'center'}
                                        flexWrap={'wrap'}
                                    >
                                        <Typography
                                            fontSize={{ xs: '.5em', sm: '.63em' }}
                                            textAlign={'center'}
                                            p={'1% 2%'}
                                        >
                                            LEVEL
                                        </Typography>
                                        <Typography
                                            fontSize={{ xs: '26px', sm: '47.5px' }}
                                            bgcolor="#274046"
                                            borderRadius=".3em"
                                            p={{ xs: '2px 14px', sm: '2px 18px' }}
                                            boxShadow="inset 1px 1px 0 1px #1c2f33"
                                        >
                                            {levelItem?.order! + 1}
                                        </Typography>
                                        <Typography
                                            fontSize={{ xs: '.5em', sm: '.63em' }}
                                            textAlign={'center'}
                                            p={'1% 2%'}
                                        >
                                            UNLOCKED
                                        </Typography>
                                    </Stack>
                                )}
                            </Fade>
                        )}
                    </Box>

                    <Stack
                        direction="row"
                        justifyContent="center"
                        width={{ xs: '70%', md: '50%', lg: '20%' }}
                        position="relative"
                        height="2em"
                        marginTop="-1em"
                        zIndex={6}
                        sx={{
                            opacity: showButtons ? 1 : 0,
                            transform: showButtons ? 'translateY(0)' : 'translateY(100%)',
                            transition: 'transform 0.5s ease-out, opacity 0.5s ease-out',
                        }}
                    >
                        <GameButton
                            image={ASSETS.EXIT_BUTTON}
                            onClick={() =>
                                onGameStats({ ...gameStats, ...defaultGameStats, levelId: null, startTime: new Date() })
                            }
                        />
                        <GameButton
                            image={ASSETS.REPLAY_BUTTON}
                            style={{ mx: '5%' }}
                            onClick={() => {
                                const updatedLevel = listLevels?.levels?.find(
                                    (level: ILevel) => level.id === levelItem?.id
                                );
                                if (updatedLevel) {
                                    onLevelItem(updatedLevel);
                                }
                                onGameStats({
                                    ...gameStats,
                                    ...defaultGameStats,
                                    hasUnlockedBodyPart: false,
                                    levelId: gameStats.levelId,
                                    startTime: new Date(),
                                });
                            }}
                        />
                        {gameStats.archivedStars >= 1 && (
                            <GameButton
                                image={ASSETS.NEXT_BUTTON}
                                onClick={() => {
                                    if (isLastLevel) {
                                        const nextStage = getNextStage();
                                        if (nextStage) {
                                            navigate(
                                                `/game-modes/story/${nextStage.id}/index/${Number(index)! + 1}/level`
                                            );
                                            onGameStats({
                                                ...defaultGameStats,
                                            });
                                        }
                                    } else {
                                        const currentLevelIndex = listLevels?.levels?.findIndex(
                                            (level: ILevel) => level.id === gameStats.levelId
                                        );
                                        if (
                                            currentLevelIndex !== undefined &&
                                            currentLevelIndex >= 0 &&
                                            listLevels?.levels?.[currentLevelIndex + 1]
                                        ) {
                                            onLevelItem(listLevels.levels[currentLevelIndex + 1]);
                                            onGameStats({
                                                ...gameStats,
                                                ...defaultGameStats,
                                                levelId: listLevels.levels[currentLevelIndex + 1].id,
                                                startTime: new Date(),
                                                levelCompleted: false,
                                            });
                                        }
                                    }
                                }}
                            />
                        )}
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
}
