import { Box, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ValueBlocksQuestionPlusIcon from '../../../assets/icon/icon-tsx/ValueBlocksQuestionPlusIcon';
import ValueBlocksQuestionRemainingIcon from '../../../assets/icon/icon-tsx/ValueBlocksQuestionRemainingIcon';
import ValueBlocksQuestionResultIcon from '../../../assets/icon/icon-tsx/ValueBlocksQuestionResultIcon';
import ValueBlocksQuestionSubtractIcon from '../../../assets/icon/icon-tsx/ValueBlocksQuestionSubtractIcon';
import ButtonsAction from '../../../components/game-appbar/components/ButtonsAction';
import PopupBaseComponent from '../../../components/pop-up';
import { appConfig } from '../../../configs/AppConfig';
import { listStagesColor } from '../../../data/listStages';
import { IPopUp } from '../../../hooks/usePopUp';
import { useResponsiveHeight } from '../../../hooks/useResponsiveHeight';
import { appColors } from '../../../themes';
import { ILevel, LevelType } from '../../../types/backend';
import { useGameStage } from '../../games-stage/hook/GameStageProvider';
import QuestionDisplay from '../components/QuestionDisplay';
import { GameStats } from '../components/QuestionsGame';
import { EquationConfig } from '../types/equation';
import { generateEquation } from '../utils/equationGenerator';

type Props = IPopUp & { onGameStats: (value: GameStats) => void; levelItem?: ILevel; gameStats: GameStats };

interface RatingData {
    value: number;
    starImage: string;
}

export default function PopupIntroducingGame(props: Props) {
    const { open, onClose, onGameStats, levelItem, gameStats } = props;
    const [equation, setEquation] = useState<EquationConfig | null>(null);
    const isShortScreen = useResponsiveHeight('short');
    const isMediumScreen = useResponsiveHeight('medium');
    const { listLevels } = useGameStage();
    const { index } = useParams();

    const stageName = listLevels?.name?.toLocaleLowerCase().replace(/\s+/g, '-');

    useEffect(() => {
        if (levelItem?.settings) {
            try {
                const generatedEquation = generateEquation(levelItem.settings);
                setEquation(generatedEquation);
            } catch (error) {
                console.error('Error generating equation:', error);
            }
        }
    }, [levelItem]);

    return (
        <PopupBaseComponent
            open={open}
            onClose={onClose}
            isHideBorder
            title={
                <Stack
                    sx={{
                        position: 'absolute',
                        top: 10,
                        fontSize: '32px',
                        fontWeight: 500,
                    }}
                >
                    <Box
                        sx={{
                            backgroundImage: `url('${appConfig.url.pathStaticMedia}/${stageName}-title-bg.${listStagesColor[Number(index)]?.infoTitleWrapper}')`,
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            minWidth: '15rem',
                            height: '6rem',
                            margin: '0 auto',
                            marginBottom: '10px',
                        }}
                    >
                        <Typography
                            sx={{
                                m: '2.5rem 3.5rem 0',
                                fontSize: '1.5rem',
                                textTransform: 'uppercase',
                                textAlign: 'center',
                            }}
                        >
                            {listLevels?.name} {levelItem?.order}
                        </Typography>
                    </Box>
                    <Stack
                        direction={'row'}
                        bgcolor={'#284145'}
                        border={'2px solid #222828'}
                        boxShadow={'inset 5px 5px 0 0 rgba(0,0,0,.2)'}
                        borderRadius={'10px'}
                        justifyContent={'space-between'}
                        flexWrap={'wrap'}
                        margin={'0px 24px'}
                        padding={'2px 16px'}
                    >
                        {getRatingData(levelItem ?? ({} as ILevel))?.map((item, index) => (
                            <Stack key={index} direction="row" spacing={1} alignItems="center">
                                <Typography sx={{ color: '#fff' }}>{item.value}</Typography>
                                <Box
                                    sx={{
                                        backgroundImage: `url('${appConfig.url.pathStaticMedia}/coin-icon.147c7be5.svg')`,
                                        margin: '5px',
                                        backgroundSize: 'contain',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center',
                                        width: '24px',
                                        height: '24px',
                                    }}
                                />
                                <Typography
                                    sx={{
                                        fontSize: '20px',
                                        fontWeight: 500,
                                        color: '#fff',
                                    }}
                                >
                                    =
                                </Typography>
                                <Box
                                    sx={{
                                        backgroundImage: `url('${item.starImage}')`,
                                        margin: '5px',
                                        backgroundSize: 'contain',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center',
                                        width: '4rem',
                                        height: '1rem',
                                    }}
                                />
                            </Stack>
                        ))}
                    </Stack>
                </Stack>
            }
            descContent={
                <Stack direction={'column'} spacing={2} height={'100%'} width={'100%'}>
                    <Typography
                        fontWeight={600}
                        width="100%"
                        textAlign="center"
                        sx={{
                            fontSize: {
                                xs: '0.9rem',
                                sm: '1rem',
                                md: '1.2rem',
                            },
                        }}
                    >
                        {levelItem?.infoTitle}
                    </Typography>
                    <Typography
                        fontWeight={600}
                        width="100%"
                        textAlign="center"
                        sx={{
                            fontSize: {
                                xs: '0.75rem',
                                sm: '0.85rem',
                                md: '1rem',
                            },
                        }}
                    >
                        {levelItem?.infoDescription}
                    </Typography>

                    {/* Preview of QuestionsGame interface */}
                    <Box
                        sx={{
                            mt: { xs: 2, sm: 3, md: 4 },
                            p: { xs: 1, sm: 1.5, md: 2 },
                            bgcolor: 'rgba(0, 0, 0, 0.1)',
                            borderRadius: '4px',
                            border: `1px solid ${appColors.white}`,
                            maxHeight: isShortScreen ? '400px' : isMediumScreen ? '500px' : '600px',
                            overflow: 'auto',
                            background: listStagesColor[Number(index)].linearGradient,
                        }}
                    >
                        {/* Title with Sound Button */}
                        <Stack
                            margin={'0 auto'}
                            direction={'row'}
                            width={'100%'}
                            justifyContent={'center'}
                            alignItems={'center'}
                            sx={{
                                mb: { xs: 1, sm: 1.5, md: 2 },
                                px: { xs: 1, sm: 2, md: 3 },
                            }}
                        >
                            <Typography
                                fontSize={{ xs: '14px', sm: '16px', md: '18px' }}
                                fontWeight={400}
                                textAlign={'center'}
                            >
                                {levelItem?.name}
                            </Typography>
                        </Stack>

                        {/* Question Display */}
                        <Stack
                            margin={'0 auto'}
                            mb={{ xs: 1, sm: 1.5, md: 2 }}
                            justifyContent={'center'}
                            alignItems={'center'}
                        >
                            {equation && (
                                <QuestionDisplay
                                    isResponsive
                                    equation={equation}
                                    levelConfigWithCount={levelItem!}
                                />
                            )}
                        </Stack>

                        {/* Value Blocks Display */}
                        {levelItem?.type === LevelType.valueBlocks && (
                            <Stack
                                direction={'row'}
                                width={'100%'}
                                alignItems={'center'}
                                textAlign={'center'}
                                justifyContent={'center'}
                                margin={'0 auto'}
                                spacing={{ xs: 2, sm: 4, md: 6 }}
                                sx={{
                                    transform: {
                                        xs: 'scale(0.6)',
                                        sm: 'scale(0.8)',
                                        md: 'scale(1)',
                                    },
                                    transformOrigin: 'center center',
                                    height: {
                                        xs: '180px',
                                        sm: '240px',
                                        md: '300px',
                                    },
                                }}
                            >
                                {equation && (
                                    <>
                                        {equation.numbers.map((num, index) => (
                                            <React.Fragment key={index}>
                                                <Stack direction="row" alignItems="flex-end" justifyContent="center">
                                                    {Array.from(
                                                        { length: Math.ceil(num.value / 10) },
                                                        (_, columnIndex) => (
                                                            <Stack
                                                                key={`column-${columnIndex}`}
                                                                // height={{ xs: '180px', sm: '240px', md: '300px' }}
                                                                justifyContent="flex-end"
                                                            >
                                                                {/* Empty blocks for this column */}
                                                                {Array.from(
                                                                    {
                                                                        length:
                                                                            columnIndex ===
                                                                                Math.ceil(num.value / 10) - 1
                                                                                ? 10 - (num.value % 10 || 10)
                                                                                : 0,
                                                                    },
                                                                    (_, i) => (
                                                                        <Box
                                                                            key={`empty-${columnIndex}-${i}`}
                                                                            height={{ xs: '25px' }}
                                                                        >
                                                                            <ValueBlocksQuestionRemainingIcon
                                                                                isResponsive
                                                                            />
                                                                        </Box>
                                                                    )
                                                                )}
                                                                {/* Filled blocks for this column */}
                                                                {Array.from(
                                                                    {
                                                                        length:
                                                                            columnIndex ===
                                                                                Math.ceil(num.value / 10) - 1
                                                                                ? num.value % 10 || 10
                                                                                : 10,
                                                                    },
                                                                    (_, i) => (
                                                                        <Box
                                                                            key={`filled-${columnIndex}-${i}`}
                                                                            height={{ xs: '25px' }}
                                                                        >
                                                                            <ValueBlocksQuestionResultIcon
                                                                                isResponsive
                                                                            />
                                                                        </Box>
                                                                    )
                                                                )}
                                                            </Stack>
                                                        )
                                                    )}
                                                </Stack>
                                                {index < equation.numbers.length - 1 &&
                                                    (equation.operators[index] === '+' ? (
                                                        <ValueBlocksQuestionPlusIcon />
                                                    ) : (
                                                        <ValueBlocksQuestionSubtractIcon />
                                                    ))}
                                            </React.Fragment>
                                        ))}
                                    </>
                                )}
                            </Stack>
                        )}
                    </Box>
                </Stack>
            }
            buttonCancel={
                <ButtonsAction
                    src={`${appConfig.url.pathStaticMedia}/exit-button.a7b9f897.svg`}
                    shadowColorTop="rgba(255, 82, 182,0.5)"
                    shadowColorBottom="rgba(255, 82, 182,0.3)"
                    onClick={() => {
                        onGameStats({ ...gameStats, levelId: null, levelCompleted: false });
                    }}
                />
            }
            buttonConfirm={
                <ButtonsAction
                    src={`${appConfig.url.pathStaticMedia}/end-of-game-next-button.22ad70eb.svg`}
                    shadowColorTop="rgba(146, 205, 95,0.5)"
                    shadowColorBottom="rgba(146, 205, 95,0.3)"
                    onClick={() => {
                        onGameStats({
                            ...gameStats,
                            levelId: levelItem?.id!,
                            levelCompleted: false,
                            startTime: new Date(),
                        });
                        onClose?.();
                    }}
                />
            }
        />
    );
}

export const getRatingData = (levelItem: ILevel): RatingData[] => {
    return [
        {
            value: (levelItem?.oneStarsRatingCount || 0) * (levelItem?.questionCount || 0),
            starImage: `${appConfig.url.pathStaticMedia}/1-star.cec9796b.svg`,
        },
        {
            value: (levelItem?.twoStarsRatingCount || 0) * (levelItem?.questionCount || 0),
            starImage: `${appConfig.url.pathStaticMedia}/2-star.4aa7318e.svg`,
        },
        {
            value: (levelItem?.threeStarsRatingCount || 0) * (levelItem?.questionCount || 0),
            starImage: `${appConfig.url.pathStaticMedia}/3-star.53df3760.svg`,
        },
    ];
};

export const calculateRating = (totalGold: number, levelItem: ILevel) => {
    // console.log('totalGold, levelItem:', { totalGold });
    if (totalGold >= getRatingData(levelItem!)?.[2].value) {
        return 3;
    } else if (totalGold >= getRatingData(levelItem!)?.[1].value && totalGold < getRatingData(levelItem!)?.[2].value) {
        return 2;
    } else if (totalGold >= getRatingData(levelItem!)?.[0].value && totalGold < getRatingData(levelItem!)?.[1].value) {
        return 1;
    } else {
        return 0;
    }
};
