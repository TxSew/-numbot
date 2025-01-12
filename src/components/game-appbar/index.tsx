import { Box, Stack, useMediaQuery } from '@mui/material';
import { useMemo } from 'react';
import ScoreBoardInventory from '../../assets/icon/icon-tsx/ScoreBoardInventory';
import usePopUp from '../../hooks/usePopUp';
import { useMobile, useTablet } from '../../hooks/useResponsive';
import { useResponsiveHeight } from '../../hooks/useResponsiveHeight';
import CustomButtonAppBar, { buttonAppBarData } from './components/CustomButtonAppBar';
import PopupSettingsContent from './components/PopupSettingsContent';
import ButtonsAction from './components/ButtonsAction';
import { appConfig } from '../../configs/AppConfig';
import { useNavigate } from 'react-router-dom';
import { glowColor } from '../../pages/levels/components/LevelSelection';

type Props = {
    isDisplayButtonBack?: boolean;
};

export default function GameAppBar({ isDisplayButtonBack = false }: Props) {
    const navigate = useNavigate();
    const isMobile = useMobile();
    const isTablet = useTablet();
    const isMediumScreen = useMediaQuery('(min-width: 900px)');
    const isLargeScreen = useMediaQuery('(min-width: 1200px)');
    const isShortScreen = useResponsiveHeight('short');
    const popupSettingAppBar = usePopUp();

    const isCompactLayout = isTablet || isMobile || isShortScreen;

    const responsiveButtonData = buttonAppBarData.map((button) => {
        const isGameModes = button.label === 'GAME MODES';
        const isLeaderboard = button.label === 'LEADERBOARD';
        const isCustomShack = button.label === 'CUSTOM SHACK';

        return {
            ...button,
            imageUrl: button.imageUrl,
            stylesBox: {
                ...button.stylesBox,
                ...(isGameModes && {
                    width: isMobile ? '38px' : isTablet ? '47px' : '52px',
                    height: isMobile ? '36px' : isTablet ? '45px' : '50px',
                }),
                ...(isLeaderboard && {
                    width: isMobile ? '47px' : isTablet ? '61px' : '66px',
                    height: isMobile ? '36px' : isTablet ? '50px' : '55px',
                }),
                ...(isCustomShack && {
                    width: isMobile ? '42px' : isTablet ? '48px' : '58px',
                    height: isMobile ? '36px' : isTablet ? '42px' : '50px',
                }),
            },
            stylesTypography: {
                display: isTablet || isMobile ? 'none' : 'block',
            },
        };
    });

    const buttonsActionPosition = useMemo(() => {
        if (isLargeScreen) return '50px';
        if (isMediumScreen) return '270px';
        if (isMobile) return '10px';
        return '20px';
    }, [isLargeScreen, isMediumScreen, isMobile]);

    return (
        <Stack
            width={'100%'}
            sx={{
                zIndex: 10,
                mt: isCompactLayout ? 1 : 3,
            }}
        >
            <Stack
                direction={isCompactLayout ? 'column' : 'row'}
                justifyContent={'center'}
                spacing={isCompactLayout ? 1 : '65px'}
                width={'100%'}
            >
                <Stack
                    direction="row"
                    spacing={isMobile ? 2 : isTablet ? 3 : 6}
                    mt={isCompactLayout ? 0 : 3}
                    width={'100%'}
                    justifyContent={isCompactLayout ? 'space-evenly' : 'center'}
                    sx={
                        isCompactLayout
                            ? {
                                position: 'fixed',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                backgroundColor: '#424c49',
                                zIndex: 10,
                                padding: isMobile ? '15px 0' : '20px 0',
                            }
                            : {}
                    }
                >
                    {(isCompactLayout ? responsiveButtonData : buttonAppBarData).map((buttonAppBar, index) => (
                        <CustomButtonAppBar key={index} {...buttonAppBar} />
                    ))}
                    {!isCompactLayout && (
                        <Box position={'relative'} top={-24}>
                            <ScoreBoardInventory />
                        </Box>
                    )}
                </Stack>
                {isCompactLayout && (
                    <Box
                        position={'relative'}
                        top={isMobile ? -15 : -20}
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
                )}
            </Stack>

            {isDisplayButtonBack && (!isMediumScreen || isLargeScreen) && (
                <ButtonsActionFixed
                    isMobile={isMobile}
                    isTablet={isTablet}
                    isCompactLayout={isCompactLayout}
                    imageUrl="back-arrow.83e9fa3e.svg"
                    leftPosition={isMobile ? 0 : buttonsActionPosition}
                    onSettingsClick={() => navigate(-1)}

                />
            )}

            <ButtonsActionFixed
                isMobile={isMobile}
                isTablet={isTablet}
                isCompactLayout={isCompactLayout}
                imageUrl="settings-button.eaddf0ed.svg"
                rightPosition={buttonsActionPosition}
                onSettingsClick={() => {
                    popupSettingAppBar.setTrue();
                }}
            />

            <PopupSettingsContent {...popupSettingAppBar} />
        </Stack>
    );
}

interface SettingsButtonProps {
    rightPosition?: React.CSSProperties['right'];
    leftPosition?: React.CSSProperties['left'];
    imageUrl: string;
    isMobile: boolean | null;
    isTablet: boolean | null;
    isCompactLayout: boolean;
    onSettingsClick: () => void;
}

const ButtonsActionFixed: React.FC<SettingsButtonProps> = ({
    isMobile,
    isTablet,
    isCompactLayout,
    imageUrl,
    rightPosition,
    leftPosition,
    onSettingsClick,
}) => {
    return (
        <Box
            position={'fixed'}
            right={rightPosition ?? undefined}
            left={leftPosition ?? undefined}
            top={isMobile ? '15px' : isTablet ? '10px' : '25px'}
            sx={{
                transform: isCompactLayout ? `scale(${isMobile ? 0.7 : 0.8})` : 'none',
                transformOrigin: 'top right',
            }}
        >
            <ButtonsAction
                src={`${appConfig.url.pathStaticMedia}/${imageUrl}`}
                shadowColorBottom={`rgba(${glowColor}, 0.5)`}
                shadowColorTop={`rgba(${glowColor}, 0.3)`}
                onClick={onSettingsClick}
            />
        </Box>
    );
};
