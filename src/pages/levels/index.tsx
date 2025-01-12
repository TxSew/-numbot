import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUnlockedParts } from '../../assets/helpers';
import ButtonsAction from '../../components/game-appbar/components/ButtonsAction';
import { appConfig } from '../../configs/AppConfig';
import usePopUp from '../../hooks/usePopUp';
import { ILevel } from '../../types/backend';
import { useGameStage } from '../games-stage/hook/GameStageProvider';
import GameCompleted from './components/GameCompleted';
import LevelSelection from './components/LevelSelection';
import QuestionGame, { GameStats } from './components/QuestionsGame';
import PopupIntroducingGame from './pop-up/PopupIntroducingGame';

export const defaultGameStats: GameStats = {
    startTime: new Date(),
    endTime: null,
    incorrectAnswers: 0,
    archivedStars: 0,
    totalGold: 0,
    levelId: null,
    levelCompleted: false,
    hasUnlockedBodyPart: false,
};

export default function LevelsPage() {
    const [gameStats, setGameStats] = useState<GameStats>(defaultGameStats);
    const [levelItem, setLevelItem] = useState<ILevel | undefined>(undefined);
    const popupIntroducingGame = usePopUp();
    const navigate = useNavigate();
    const { stageId, index } = useParams();
    const { listStages } = useGameStage();
    const stageItem = listStages?.find((stage) => stage.id === Number(stageId));
    // console.log('listStages', listStages);
    // console.log('index', index);
    // console.log('🚀 ~ LevelsPage ~ listLevels:', listLevels);
    // console.log('🚀 ~ LevelsPage ~ levelItem:', levelItem);
    // console.log('🚀 ~ LevelsPage ~ stageItem:', stageItem);
    const unlockedParts = getUnlockedParts(levelItem?.order ?? 0, stageItem?.totalLevel ?? 0);
    // console.log('🚀 ~ LevelsPage ~ unlockedParts:', unlockedParts);

    useEffect(() => {
        if (!index) return;

        const currentStageIndex = Number(index);
        const previousStage = currentStageIndex > 0 ? listStages?.[currentStageIndex - 1] : null;
        // console.log('previousStage', previousStage);
        if (previousStage && previousStage.userLevel < previousStage.totalLevel) {
            navigate(-1);
        }
    }, [index, listStages, navigate]);

    // console.log('gameStats', gameStats);
    const handleSetGameStats = (value: GameStats) => {
        setGameStats((prev) => ({ ...prev, ...value }));
    };
    return (
        <Box width="100%" height="100vh">
            {gameStats.hasUnlockedBodyPart ? (
                <Box className="bot-part-notification">
                    <Box className="achievement-notification-content">
                        <Box
                            className="title-wrapper"
                            sx={{
                                backgroundImage: `url(${appConfig.url.pathStaticMedia}/iron-part-collected.0ca18fc4.svg)`,
                            }}
                        >
                            <Typography className="sub-title">iron</Typography>
                            <Typography className="title">PART COLLECTED</Typography>
                        </Box>
                        <Box className="bot-wrapper">
                            <Box
                                className="achievement-bg-icon achievement-torso-icon"
                                sx={{
                                    backgroundImage: `url(${appConfig.url.pathBotProgress}/iron-torso-shaded.svg)`,
                                    position: 'absolute',
                                }}
                            />
                            <Box
                                className="achievement-bg-icon achievement-head-icon"
                                sx={{
                                    backgroundImage: `url(${appConfig.url.pathBotProgress}/iron-head-shaded.svg)`,
                                    position: 'absolute',
                                }}
                            />
                            <Box
                                className="achievement-bg-icon achievement-left-arm-icon"
                                sx={{
                                    backgroundImage: `url(${appConfig.url.pathBotProgress}/iron-left-arm-shaded.svg)`,
                                    position: 'absolute',
                                }}
                            />
                            <Box
                                className="achievement-bg-icon achievement-legs-icon"
                                sx={{
                                    backgroundImage: `url(${appConfig.url.pathBotProgress}/iron-legs-shaded.svg)`,
                                    position: 'absolute',
                                }}
                            />
                            <Box
                                className="achievement-bg-icon achievement-right-arm-icon"
                                sx={{
                                    backgroundImage: `url(${appConfig.url.pathBotProgress}/iron-right-arm-shaded.svg)`,
                                    position: 'absolute',
                                }}
                            />

                            <Box
                                className={`achievement-bg-icon achievement-torso-icon ${unlockedParts[1] ? 'achievement-icon' : ''}`}
                                sx={{
                                    backgroundImage: `url(${appConfig.url.pathBotProgress}/iron-torso.svg)`,
                                    opacity: unlockedParts[1] && gameStats.hasUnlockedBodyPart ? 1 : 0,
                                    position: 'absolute',
                                    transition: 'opacity 0.3s ease-in-out',
                                }}
                            />
                            <Box
                                className={`achievement-bg-icon achievement-head-icon ${unlockedParts[4] ? 'achievement-icon' : ''}`}
                                sx={{
                                    backgroundImage: `url(${appConfig.url.pathBotProgress}/iron-head.svg)`,
                                    opacity: unlockedParts[4] && gameStats.hasUnlockedBodyPart ? 1 : 0,
                                    position: 'absolute',
                                    transition: 'opacity 0.3s ease-in-out',
                                }}
                            />
                            <Box
                                className={`achievement-bg-icon achievement-left-arm-icon ${unlockedParts[3] ? 'achievement-icon' : ''}`}
                                sx={{
                                    backgroundImage: `url(${appConfig.url.pathBotProgress}/iron-left-arm.svg)`,
                                    opacity: unlockedParts[3] && gameStats.hasUnlockedBodyPart ? 1 : 0,
                                    position: 'absolute',
                                    transition: 'opacity 0.3s ease-in-out',
                                }}
                            />
                            <Box
                                className={`achievement-bg-icon achievement-legs-icon ${unlockedParts[0] ? 'achievement-icon' : ''}`}
                                sx={{
                                    backgroundImage: `url(${appConfig.url.pathBotProgress}/iron-legs.svg)`,
                                    opacity: unlockedParts[0] && gameStats.hasUnlockedBodyPart ? 1 : 0,
                                    position: 'absolute',
                                    transition: 'opacity 0.3s ease-in-out',
                                }}
                            />
                            <Box
                                className={`achievement-bg-icon achievement-right-arm-icon ${unlockedParts[2] ? 'achievement-icon' : ''}`}
                                sx={{
                                    backgroundImage: `url(${appConfig.url.pathBotProgress}/iron-right-arm.svg)`,
                                    opacity: unlockedParts[2] && gameStats.hasUnlockedBodyPart ? 1 : 0,
                                    position: 'absolute',
                                    transition: 'opacity 0.3s ease-in-out',
                                }}
                            />
                        </Box>
                        <Box className="button-wrapper">
                            <ButtonsAction
                                src={`${appConfig.url.pathStaticMedia}/end-of-game-next-button.22ad70eb.svg`}
                                shadowColorTop="rgba(146, 205, 95,0.5)"
                                shadowColorBottom="rgba(146, 205, 95,0.3)"
                                onClick={() => {
                                    setGameStats({
                                        ...gameStats,
                                        levelCompleted: true,
                                        hasUnlockedBodyPart: false,
                                    });
                                }}
                            />
                        </Box>
                        <Box className="animated-bg">
                            <Box className="glow-bg" />
                            <Box className="beams-bg" />
                            <Box className="explosion-left-bg" />
                            <Box className="explosion-right-bg" />
                            <Box className="stars-bg" />
                        </Box>
                    </Box>
                </Box>
            ) : gameStats.levelCompleted ? (
                <GameCompleted
                    gameStats={gameStats}
                    levelItem={levelItem}
                    onLevelItem={setLevelItem}
                    onGameStats={handleSetGameStats}
                />
            ) : gameStats.levelId ? (
                <QuestionGame
                    gameStats={gameStats}
                    onGameStats={handleSetGameStats}
                    levelItem={levelItem}
                    popupIntroducingGame={popupIntroducingGame}
                />
            ) : (
                <LevelSelection
                    onGameStats={handleSetGameStats}
                    gameStats={gameStats}
                    onLevelItem={setLevelItem}
                    popupIntroducingGame={popupIntroducingGame}
                />
            )}

            <PopupIntroducingGame
                {...popupIntroducingGame}
                onGameStats={handleSetGameStats}
                levelItem={levelItem}
                gameStats={gameStats}
            />
        </Box>
    );
}
