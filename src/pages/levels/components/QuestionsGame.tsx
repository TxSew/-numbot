import { Box, Stack, Typography, useMediaQuery } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ScoreBoardInventory from '../../../assets/icon/icon-tsx/ScoreBoardInventory';
import SoundButtonIcon from '../../../assets/icon/icon-tsx/SoundButtonIcon';
import ValueBlocksQuestionPlusIcon from '../../../assets/icon/icon-tsx/ValueBlocksQuestionPlusIcon';
import ValueBlocksQuestionRemainingIcon from '../../../assets/icon/icon-tsx/ValueBlocksQuestionRemainingIcon';
import ValueBlocksQuestionResultIcon from '../../../assets/icon/icon-tsx/ValueBlocksQuestionResultIcon';
import ValueBlocksQuestionSubtractIcon from '../../../assets/icon/icon-tsx/ValueBlocksQuestionSubtractIcon';
import ButtonsAction from '../../../components/game-appbar/components/ButtonsAction';
import { appConfig } from '../../../configs/AppConfig';
import { useBackendControllers } from '../../../contexts/BackendControllerContext';
import { UsePopUpReturnType } from '../../../hooks/usePopUp';
import { useMobile, useSmallerThan, useTablet } from '../../../hooks/useResponsive';
import { ILevel, IUserLevel, LevelType } from '../../../types/backend';
import HangingBar from '../../games-stage/components/HangingBar';
import { calculateRating } from '../pop-up/PopupIntroducingGame';
import { EquationConfig } from '../types/equation';
import { generateEquation, resetUsedQuestions } from '../utils/equationGenerator';
import QuestionDisplay from './QuestionDisplay';
import { useGameStage } from '../../games-stage/hook/GameStageProvider';
import RodGame from '../../../assets/icon/icon-tsx/RodIcon';
import AnswersStory from '../../../assets/icon/icon-tsx/AnswersStory';
import CoinsStoryIcon from '../../../assets/icon/icon-tsx/CoinsStoryIcon';
import { initialKeyboardKeys } from '../../../components/game-appbar/configs';

export interface GameStats {
    startTime: Date;
    endTime: Date | null;
    incorrectAnswers: number;
    archivedStars: number;
    totalGold: number;
    levelId: number | null;
    levelCompleted: boolean;
    hasUnlockedBodyPart?: boolean;
}

interface CurrentQuestion {
    equation: EquationConfig;
    answered: boolean;
}

type Props = {
    gameStats: GameStats;
    onGameStats: (value: GameStats) => void;
    levelItem?: ILevel;
    popupIntroducingGame: UsePopUpReturnType;
};

export default function QuestionsGame(props: Props) {
    const { gameStats, onGameStats, levelItem, popupIntroducingGame } = props;
    const isTabletAlt = useTablet();
    const isMobile = useMobile();
    // console.log('🚀 ~ QuestionsGame ~ isMobile, isTabletAlt:', { isMobile, isTabletAlt });
    const { stageId } = useParams();
    const { listLevels } = useGameStage();
    const queryClient = useQueryClient();
    const isXSmall = useSmallerThan('xs');
    const isSmall = useSmallerThan('sm');
    const isMedium = useSmallerThan('md');
    const { stageController, userLevelController } = useBackendControllers();
    const isMobileOrTablet = useMediaQuery('(max-width: 768px)');
    const isMobileM = useMediaQuery('(max-width: 375px)');
    const isMobileS = useMediaQuery('(max-width: 320px)');


    const getBoxHeight = () => {
        if (isXSmall) return '30px';
        if (isSmall) return '40px';
        if (isMedium) return '20px';
        return '50px';
    };

    const boxHeight = getBoxHeight();

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [questions, setQuestions] = useState<CurrentQuestion[]>([]);
    const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
    const [answer, setAnswer] = useState<string>('?');
    const [isIncorrect, setIsIncorrect] = useState<boolean>(false);
    const [isCorrect, setIsCorrect] = useState<boolean>(false);
    // console.log('isCorrect', isCorrect)
    const getHasUnlockedBodyPart = (order: number | undefined, totalLevels: number) => {
        if (!order || !totalLevels) return false;
        const interval = Math.ceil(totalLevels / 5);
        const index = Math.floor((order - 1) / interval);
        const targetOrder = totalLevels - (4 - index) * interval;
        return order === targetOrder;
    };

    const hasUnlockedBodyPart = getHasUnlockedBodyPart(levelItem?.order ?? 0, listLevels.levels.length);

    // console.log('hasUnlockedBodyPart', hasUnlockedBodyPart);

    const calculateCoin = (timeTaken: number, incorrectAttempts: number): number => {
        const baseCoin = levelItem?.threeStarsRatingCount || 0;
        let timeBonus = 0;
        let incorrectPenalty = 0;

        if (timeTaken <= 3) {
            timeBonus = 2;
        } else if (timeTaken <= 5) {
            timeBonus = 1;
        } else if (timeTaken > 10) {
            timeBonus = -4;
        }

        if (incorrectAttempts === 1) {
            incorrectPenalty = 1;
        } else if (incorrectAttempts > 1) {
            incorrectPenalty = 2;
        } else if (incorrectAttempts > 5) {
            incorrectPenalty = 3;
        }

        const finalCoin = Math.round(baseCoin + timeBonus - incorrectPenalty);
        return Math.max(1, finalCoin);
    };

    const handleAnswerSubmit = useCallback(
        (answer: string) => {
            if (!questions[currentQuestionIndex]) return false;

            const currentEquation = questions[currentQuestionIndex].equation;
            let isCorrect = false;

            if (currentEquation.answer_required === 'value_2') {
                const value1 = currentEquation.numbers[0].value;
                const targetAnswer = currentEquation.displaySum ?? currentEquation.result;
                const expectedValue2 =
                    currentEquation.operators[0] === '+' ? targetAnswer - value1 : value1 - targetAnswer;
                isCorrect = expectedValue2.toString() === answer;
            } else if (currentEquation.answer_required === 'answer') {
                isCorrect = currentEquation.result.toString() === answer;
            } else {
                const answerNumber = currentEquation.numbers.find((num) => num.isAnswer);
                isCorrect = Boolean(answerNumber && answerNumber.value.toString() === answer);
            }

            if (isCorrect) {
                const updatedQuestions = [...questions];
                updatedQuestions[currentQuestionIndex].answered = true;
                setQuestions(updatedQuestions);

                const timeTaken = (new Date().getTime() - gameStats.startTime.getTime()) / 1000;
                const earnedGold = calculateCoin(timeTaken, gameStats.incorrectAnswers);
                const newTotalGold = gameStats.totalGold + earnedGold;

                if (currentQuestionIndex < questions.length - 1) {
                    onGameStats({
                        ...gameStats,
                        startTime: new Date(),
                        endTime: null,
                        incorrectAnswers: 0,
                        archivedStars: 0,
                        totalGold: newTotalGold,
                        levelCompleted: false,
                    });
                    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
                } else {
                    const finalStats: GameStats = {
                        ...gameStats,
                        endTime: new Date(),
                        totalGold: newTotalGold,
                        archivedStars: calculateRating(newTotalGold, levelItem!),
                        levelCompleted: true,
                    };
                    // console.log('finalStats', { ...finalStats });
                    onGameStats({ ...finalStats });
                    // console.log('gameStats!', { gameStats });
                    if (finalStats.endTime) {
                        handleSubmitLevel({
                            archivedStars: finalStats.archivedStars,
                            levelId: levelItem?.id,
                            playerId: 4,
                            id: levelItem?.user_levels?.[0]?.id || undefined,
                        } as IUserLevel);
                        const isFirstPlay = !levelItem?.user_levels || levelItem?.user_levels.length === 0;
                        if (hasUnlockedBodyPart && isFirstPlay) {
                            // console.log('isFirstPlay', isFirstPlay);
                            const shouldUnlockBodyPart = isFirstPlay && finalStats.archivedStars >= 1;
                            // console.log('shouldUnlockBodyPart', shouldUnlockBodyPart);
                            onGameStats({
                                ...finalStats,
                                hasUnlockedBodyPart: shouldUnlockBodyPart,
                                levelCompleted: false,
                            });
                        } else {
                            onGameStats({
                                ...finalStats,
                                hasUnlockedBodyPart: false,
                                levelCompleted: true,
                            });
                        }
                    }
                }
            } else {
                onGameStats({
                    ...gameStats,
                    incorrectAnswers: gameStats.incorrectAnswers + 1,
                });
            }

            return isCorrect;
        },
        [currentQuestionIndex, questions, gameStats]
    );

    const renderValueBlocks = (value: number) => {
        const columns = Math.ceil(value / 10);
        const blocks = [];

        if (value === 0) {
            const columnBlocks = [];
            for (let i = 0; i < 10; i++) {
                columnBlocks.push(
                    <Box key={`empty-${i}`} height={boxHeight}>
                        <ValueBlocksQuestionRemainingIcon />
                    </Box>
                );
            }
            blocks.push(
                <Stack key={`column-0`} justifyContent="flex-end">
                    {columnBlocks}
                </Stack>
            );
            return (
                <Stack direction="row" alignItems="flex-end" justifyContent="center">
                    {blocks}
                </Stack>
            );
        }

        for (let col = 0; col < columns; col++) {
            const columnBlocks = [];
            const remainingValue = value - col * 10;
            const filledBlocks = Math.min(10, remainingValue);
            const emptyBlocks = 10 - filledBlocks;

            for (let i = 0; i < emptyBlocks; i++) {
                columnBlocks.push(
                    <Box key={`empty-${i}`} height={boxHeight}>
                        <ValueBlocksQuestionRemainingIcon />
                    </Box>
                );
            }

            for (let i = 0; i < filledBlocks; i++) {
                columnBlocks.push(
                    <Box key={`filled-${i}`} height={boxHeight}>
                        <ValueBlocksQuestionResultIcon />
                    </Box>
                );
            }

            blocks.push(
                <Stack key={`column-${col}`} justifyContent="flex-end">
                    {columnBlocks}
                </Stack>
            );
        }

        return (
            <Stack direction="row" alignItems="flex-end" justifyContent="center">
                {blocks}
            </Stack>
        );
    };

    const handlePlaySoundInstruction = () => {
        if (!selectedVoice) {
            console.warn('No voice selected yet!');
            return;
        }

        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(levelItem?.name);
        utterance.voice = selectedVoice;
        utterance.rate = 0.9;
        utterance.pitch = 1.1;
        utterance.volume = 1.0;
        window.speechSynthesis.speak(utterance);
    };

    const handleSubmitLevel = async (data: IUserLevel) => {
        try {
            await userLevelController.upsert(data);
            await stageController.listStageByOrganizationUserId(4);
            await stageController.getStageById({ stageId: Number(stageId), playerId: 4 });

            queryClient.invalidateQueries({
                queryKey: ['listStages',],
                exact: true,
            });
            queryClient.invalidateQueries({
                queryKey: ['listLevels', stageId],
                exact: true,
            });
        } catch (error) {
            console.error('Error updating level:', error);
        }
    };

    const updateAnswer = useCallback((newValue: string) => {
        const formattedValue = newValue === '' ? '?' : newValue;
        setAnswer(formattedValue);
    }, []);

    const handlePhysicalKeyPress = useCallback(
        (event: KeyboardEvent) => {
            const currentValue = answer === '?' ? '' : answer;

            if (event.key === 'Enter' && currentValue !== '') {
                const isCorrect = handleAnswerSubmit?.(currentValue);
                if (isCorrect) {
                    updateAnswer('?');
                    setIsCorrect(true)
                    setTimeout(() => {
                        setIsCorrect(false);
                    }, 500);
                } else {
                    setIsIncorrect(true);
                    updateAnswer('?');
                    setTimeout(() => {
                        setIsIncorrect(false);
                    }, 500);
                }
                return;
            }

            switch (event.key) {
                case 'Backspace':
                    updateAnswer(currentValue.slice(0, -1));
                    break;
                default:
                    if (/^\d$/.test(event.key) && currentValue.length < 3) {
                        updateAnswer(currentValue + event.key);
                    }
                    break;
            }
        },
        [answer, updateAnswer, handleAnswerSubmit]
    );

    const handleVirtualKeyPress = useCallback(
        (key: string) => {
            const currentValue = answer === '?' ? '' : answer;

            if (key === 'Enter' && currentValue !== '') {
                const isCorrect = handleAnswerSubmit?.(currentValue);
                if (isCorrect) {
                    updateAnswer('?');
                    setIsCorrect(true)
                    setTimeout(() => {
                        setIsCorrect(false);
                    }, 500);
                } else {
                    setIsIncorrect(true);
                    updateAnswer('?');
                    setTimeout(() => {
                        setIsIncorrect(false);
                    }, 500);
                }
                return;
            }

            switch (key) {
                case 'Delete':
                    updateAnswer(currentValue.slice(0, -1));
                    break;
                default:
                    if (/^\d$/.test(key) && currentValue.length < 3) {
                        updateAnswer(currentValue + key);
                    }
                    break;
            }
        },
        [answer, updateAnswer, handleAnswerSubmit]
    );

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            handlePhysicalKeyPress(event);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handlePhysicalKeyPress]);

    useEffect(() => {
        resetUsedQuestions();
        // console.log('levelItem', levelItem);
        const initialQuestions = Array(levelItem?.questionCount)
            .fill(null)
            .map(
                () =>
                    ({
                        equation: generateEquation(levelItem?.settings!),
                        answered: false,
                    }) as CurrentQuestion
            );

        setQuestions(initialQuestions);
    }, []);

    useEffect(() => {
        const initVoices = () => {
            const voices = window.speechSynthesis.getVoices();
            const preferredVoice =
                voices.find(
                    (voice) =>
                        (voice.name.includes('Samantha') ||
                            voice.name.includes('Microsoft Zira') ||
                            voice.name.toLowerCase().includes('female')) &&
                        voice.lang.startsWith('en')
                ) || voices.find((voice) => voice.lang.startsWith('en'));

            setSelectedVoice(preferredVoice || null);
        };

        if (window.speechSynthesis.getVoices().length) {
            initVoices();
        } else {
            window.speechSynthesis.onvoiceschanged = initVoices;
        }

        return () => {
            window.speechSynthesis.cancel();
        };
    }, []);

    return (
        <Box width={'100%'}>
            <Stack
                direction={isTabletAlt ? 'column' : 'row'}
                justifyContent={'center'}
                spacing={isTabletAlt ? 2 : '65px'}
                width={'100%'}
            >
                <Box
                    position={'relative'}
                    top={0}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                        justifyContent: 'center',
                    }}
                >
                    <ScoreBoardInventory />
                </Box>
            </Stack>
            <Stack direction={'row'} justifyContent={'space-between'} width={'100%'}>
                <Box position={'fixed'} left={isMobile ? '10px' : '50px'} top={isMobile ? '10px' : '20px'}>
                    <ButtonsAction
                        src={`${appConfig.url.pathStaticMedia}/exit-button.a7b9f897.svg`}
                        shadowColorTop="rgba(255, 82, 182, 0.5)"
                        shadowColorBottom="rgba(255, 82, 182, 0.3)"
                        onClick={() => onGameStats({ ...gameStats, levelId: null, levelCompleted: false })}
                    />
                </Box>
                <Box position={'fixed'} right={isMobile ? '10px' : '50px'} top={isMobile ? '10px' : '20px'}>
                    <ButtonsAction
                        src={`${appConfig.url.pathStaticMedia}/information-button.5f0a86bf.svg`}
                        shadowColorTop="rgba(87, 188, 255, 0.5)"
                        shadowColorBottom="rgba(87, 188, 255, 0.3)"
                        onClick={() => popupIntroducingGame.setTrue()}
                    />
                </Box>
            </Stack>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
                <Box
                    position={'relative'}
                    maxWidth={'28rem'}
                    display={'flex'}
                    flexDirection={'row'}
                    justifyContent={'flex-end'}
                    width={'25%'}
                    sx={{
                        mt: -7,
                        transform: 'translate(-.1rem,2rem)',
                    }}
                >
                    <RodGame />
                    <AnswersStory
                        currentQuestion={currentQuestionIndex + 1}
                        totalQuestion={questions.length}
                        isIncorrect={isIncorrect}
                        isCorrect={isCorrect}
                        correctAnswers={currentQuestionIndex}
                    />
                </Box>

                <HangingBar label={`${listLevels.name} ${levelItem?.order}`} />
                <Box
                    position={'relative'}
                    maxWidth={'28rem'}
                    display={'flex'}
                    flexDirection={'row'}
                    justifyContent={'flex-end'}
                    width={'25%'}
                    sx={{
                        mt: -7,
                        transform: 'translateY(2rem)',
                    }}
                >
                    <CoinsStoryIcon totalCoin={gameStats.totalGold} isIncorrect={isIncorrect} isCorrect={isCorrect} />
                    <RodGame />
                </Box>
            </Stack>
            <Stack margin={'0 auto'} direction={'row'} width={'70%'} justifyContent={'center'} alignItems={'center'}>
                <Typography
                    fontSize={'40px'}
                    textAlign={'center'}
                    sx={{
                        fontSize: {
                            xs: '20px',
                            sm: '25px',
                            md: '30px',
                            lg: '35px',
                            xl: '40px',
                        },
                        fontWeight: {
                            xs: 400,
                            sm: 500,
                            md: 600,
                            lg: 700,
                        },
                    }}
                >
                    {levelItem?.name}
                </Typography>

                <Box
                    onClick={handlePlaySoundInstruction}
                    sx={{
                        cursor: 'pointer',
                        ml: 2,
                        '& svg': {
                            transition: 'filter 0.3s ease',
                        },
                        '&:hover svg': {
                            filter: `
                                drop-shadow(0 0 5px rgba(255, 255, 255, 0.5))
                                drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))
                            `,
                        },
                    }}
                >
                    <SoundButtonIcon />
                </Box>
            </Stack>

            <Stack margin={'0 auto'} mb={2} width={'70%'} justifyContent={'center'} alignItems={'center'}>
                {questions[currentQuestionIndex] && (
                    <QuestionDisplay
                        answer={answer}
                        key={currentQuestionIndex}
                        equation={questions[currentQuestionIndex].equation}
                        levelConfigWithCount={levelItem!}
                    />
                )}
            </Stack>

            <Stack
                direction={'row'}
                width={'100%'}
                alignItems={'center'}
                textAlign={'center'}
                justifyContent={'center'}
                margin={'0 auto'}
                spacing={6}
            >
                {levelItem?.type === LevelType.valueBlocks && (
                    <>
                        {questions[currentQuestionIndex] &&
                            questions[currentQuestionIndex].equation.numbers.map((num, index) => (
                                <React.Fragment key={index}>
                                    {renderValueBlocks(num.value)}
                                    {index < questions[currentQuestionIndex].equation.numbers.length - 1 &&
                                        (questions[currentQuestionIndex].equation.operators[index] === '+' ? (
                                            <ValueBlocksQuestionPlusIcon />
                                        ) : (
                                            <ValueBlocksQuestionSubtractIcon />
                                        ))}
                                </React.Fragment>
                            ))}
                    </>
                )}
            </Stack>

            {isMobileOrTablet && (
                <Stack direction="row" flexWrap="wrap" justifyContent="center">
                    {initialKeyboardKeys.map((key, index) => (
                        <Box
                            key={index}
                            onClick={() => handleVirtualKeyPress(key.value)}
                            sx={{
                                width: { xs: '32%', sm: isMedium ? '195px' : '27%' },
                                height: { xs: isMobileS ? '46px' : isMobileM ? '52px' : '60px', sm: isMedium ? '85px' : '90px' },
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundImage: `url(${key.imageUrl})`,
                                backgroundSize: 'cover',
                                cursor: 'pointer',
                            }}
                        />
                    ))}
                </Stack>
            )}
        </Box>
    );
}
