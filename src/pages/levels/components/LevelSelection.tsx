import { Box, Stack } from '@mui/material';
// @ts-ignore
import 'swiper/css';
// @ts-ignore
import 'swiper/css/navigation';
// @ts-ignore
import 'swiper/css/pagination';
import { useEffect, useState } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { defaultGameStats } from '..';
import GameAppBar from '../../../components/game-appbar';
import LevelItem from '../../../components/level/LevelItem';
import { appConfig } from '../../../configs/AppConfig';
import { useGridLayout } from '../../../hooks/useGridLayout';
import { UsePopUpReturnType } from '../../../hooks/usePopUp';
import { useMobile } from '../../../hooks/useResponsive';
import { useResponsiveHeight } from '../../../hooks/useResponsiveHeight';
import { useBackdropContext } from '../../../providers/BackdropProvider';
import { ILevel } from '../../../types/backend';
import HangingBar from '../../games-stage/components/HangingBar';
import SwiperNavigation from '../../games-stage/game-stage-story/components/SwiperNavigation';
import { useGameStage } from '../../games-stage/hook/GameStageProvider';
import { GameStats } from './QuestionsGame';

type LevelSelectionProps = {
    onGameStats: (value: GameStats) => void;
    gameStats: GameStats;
    onLevelItem: (value: ILevel | undefined) => void;
    popupIntroducingGame: UsePopUpReturnType;
};

const CORNER_PANEL_SEQUENCE = [
    'level-corner-panel-legs.ee765e73.svg',
    'level-corner-panel-body.e0fb88ef.svg',
    'level-corner-panel-right-arm.33b44a22.svg',
    'level-corner-panel-left-arm.91d2d00c.svg',
    'level-corner-panel-head.d8d0cf79.svg',
];

const RATING_IMAGES: Record<1 | 2 | 3, string> = {
    1: 'rating-1.6ea36848.png',
    2: 'rating-2.6f9450ec.png',
    3: 'rating-3.4afe58a0.png',
};
export const glowColor = '255, 255, 255';
export default function LevelSelection(props: LevelSelectionProps) {
    const { onGameStats, gameStats, onLevelItem, popupIntroducingGame } = props;
    const { listLevels, isLoadingLevels } = useGameStage();
    const { showBackdrop, hideBackdrop } = useBackdropContext();

    const { itemsPerPage, itemWidth } = useGridLayout();
    const isMobile = useMobile();
    const isShortScreen = useResponsiveHeight('short');
    const isMediumScreen = useResponsiveHeight('medium');
    const [initialSlide, setInitialSlide] = useState<number>(0);

    const itemSize = {
        xs: isShortScreen ? '80px' : isMediumScreen ? '100px' : '120px',
        sm: isShortScreen ? '100px' : isMediumScreen ? '120px' : '140px',
        md: isShortScreen ? '120px' : isMediumScreen ? '140px' : '160px',
    };

    const shouldShowNavigation = (listLevels?.levels?.length || 0) > itemsPerPage;

    const getCornerImage = (order: number, totalLevels: number) => {
        if (!totalLevels) return undefined;

        const interval = Math.ceil(totalLevels / 5);
        const index = Math.floor((order - 1) / interval);
        const targetOrder = totalLevels - (4 - index) * interval;

        if (index < CORNER_PANEL_SEQUENCE.length && order === targetOrder) {
            return `${appConfig.url.pathStaticMedia}/${CORNER_PANEL_SEQUENCE[index]}`;
        }

        return undefined;
    };

    const hasUserLevels = listLevels?.levels.some((level: ILevel) => level.user_levels?.length! > 0);

    const isCurrentUnlocked = (item: ILevel) => {
        if (!hasUserLevels) {
            return listLevels?.levels.findIndex((level: ILevel) => level.id === item.id) === 0;
        } else {
            const highestCompletedOrder = Math.max(
                ...listLevels?.levels
                    .filter((level: ILevel) => level.user_levels?.length! > 0)
                    .map((level: ILevel) => level.order)
            );

            return item.user_levels?.length! > 0 || item.order === highestCompletedOrder + 1;
        }
    };


    useEffect(() => {
        if (listLevels?.levels) {
            const currentLevel = listLevels.levels.find((level: ILevel) =>
                !level.user_levels?.length && level.order
            );

            if (currentLevel) {
                const currentOrder = currentLevel.order;
                const pageIndex = Math.floor((currentOrder - 1) / itemsPerPage);
                setInitialSlide(pageIndex);
            }
        }
    }, [listLevels, itemsPerPage]);


    useEffect(() => {
        if (isLoadingLevels) {
            showBackdrop();
        } else {
            hideBackdrop();
        }

        return () => {
            hideBackdrop();
        };
    }, [isLoadingLevels, showBackdrop, hideBackdrop]);

    return (
        <Box width={'100%'}>
            <GameAppBar isDisplayButtonBack />
            <HangingBar label={listLevels?.name} />
            <Box
                width={'90%'}
                maxWidth={'800px'}
                margin={'0 auto'}
                position="relative"
                sx={{
                    '& .swiper-pagination-bullet-active': {
                        backgroundColor: '#666',
                    },
                    '& .swiper-button-prev, & .swiper-button-next': {
                        display: shouldShowNavigation
                            ? {
                                sm: 'flex',
                            }
                            : 'none',
                        width: '40px',
                        height: '40px',
                        '&::after': {
                            fontSize: '24px',
                        },
                        borderRadius: '50%',
                        padding: '8px',
                    },
                    '& .swiper-button-prev': {
                        left: {
                            sm: '-30px',
                            md: '-50px',
                        },
                    },
                    '& .swiper-button-next': {
                        right: {
                            sm: '-40px',
                            md: '-50px',
                        },
                    },
                }}
            >
                <Swiper
                    modules={[Navigation]}
                    navigation={
                        shouldShowNavigation
                            ? {
                                prevEl: '.swiper-button-prev',
                                nextEl: '.swiper-button-next',
                            }
                            : false
                    }
                    initialSlide={initialSlide}
                    spaceBetween={5}
                    slidesPerView={'auto'}
                    centeredSlides={false}
                    style={{ padding: '0 40px' }}
                >
                    {Array(Math.max(0, Math.ceil((listLevels?.levels?.length || 0) / itemsPerPage)))
                        .fill(null)
                        .map((_, pageIndex) => (
                            <SwiperSlide
                                key={pageIndex}
                                style={{
                                    width: 'auto',
                                    maxWidth: '100%',
                                }}
                            >
                                <Stack
                                    direction={'row'}
                                    flexWrap={'wrap'}
                                    justifyContent={isMobile ? 'center' : 'flex-start'}
                                    sx={{
                                        padding: '20px 0',
                                        gap: { xs: 0, sm: 2, md: 0 },
                                        width: '100%',
                                    }}
                                >
                                    {listLevels?.levels
                                        .slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)
                                        .map((item: any, i: any) => {
                                            const levelNumber = pageIndex * itemsPerPage + i + 1;
                                            return (
                                                <Stack
                                                    key={levelNumber}
                                                    width={itemWidth}
                                                    direction={'row'}
                                                    justifyContent={'center'}
                                                    alignItems={'center'}
                                                    sx={{
                                                        mb: 0,
                                                        minWidth: {
                                                            xs: itemSize.xs,
                                                            sm: itemSize.sm,
                                                            md: itemSize.md,
                                                        },
                                                    }}
                                                >
                                                    <Box
                                                        onClick={() => {
                                                            if (!item.user_levels?.length && !isCurrentUnlocked(item)) {
                                                                return;
                                                            }
                                                            onLevelItem(item);
                                                            // onGameStats({
                                                            //     ...gameStats,
                                                            //     ...defaultGameStats,
                                                            //     levelId: item.id,
                                                            //     levelCompleted: false,
                                                            //     startTime: new Date(),
                                                            // });
                                                            if (item?.user_levels?.length) {
                                                                onGameStats({
                                                                    ...gameStats,
                                                                    ...defaultGameStats,
                                                                    levelId: item.id,
                                                                    levelCompleted: false,
                                                                    startTime: new Date(),
                                                                });
                                                            } else {
                                                                popupIntroducingGame.setTrue();
                                                            }
                                                        }}
                                                    >
                                                        <LevelItem
                                                            backgroundImage={
                                                                item.user_levels?.length
                                                                    ? `${appConfig.url.pathStaticMedia}/level-passed.dd32bf17.png`
                                                                    : isCurrentUnlocked(item)
                                                                        ? `${appConfig.url.pathStaticMedia}/level-new.f8022dd8.png`
                                                                        : `${appConfig.url.pathStaticMedia}/level-locked.5ad7c553.png`
                                                            }
                                                            isLocked={
                                                                !item.user_levels?.length && !isCurrentUnlocked(item)
                                                            }
                                                            cornerImage={getCornerImage(
                                                                item.order,
                                                                listLevels?.levels?.length
                                                            )}
                                                            ratingImage={
                                                                item?.user_levels?.length &&
                                                                    item?.user_levels[0]?.archivedStars
                                                                    ? `${appConfig.url.pathStaticMedia}/${RATING_IMAGES[item?.user_levels[0].archivedStars as 1 | 2 | 3]}`
                                                                    : undefined
                                                            }
                                                            levelText={item.order}
                                                            item={item}
                                                        />
                                                    </Box>
                                                </Stack>
                                            );
                                        })}
                                </Stack>
                            </SwiperSlide>
                        ))}
                </Swiper>
                <SwiperNavigation />
            </Box>
        </Box>
    );
}
