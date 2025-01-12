import { Box, SxProps, Theme, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMobile, useTablet } from '../../../hooks/useResponsive';
import { appConfig } from '../../../configs/AppConfig';

interface ButtonAppBarProps {
    label: string;
    imageUrl: string;
    mobileImageUrl: string;
    navigate?: string;
    openPopup?: boolean;
    stylesBox: SxProps<Theme>;
    stylesTypography: SxProps<Theme>;
    glowColor: string;
}

export default function CustomButtonAppBar(props: ButtonAppBarProps) {
    const { label, imageUrl, stylesBox, glowColor, mobileImageUrl, stylesTypography, navigate: navigatePath } = props;
    const navigate = useNavigate();
    const location = useLocation();
    const isTablet = useTablet();
    const isMobile = useMobile();
    const isActive = navigatePath ? location.pathname.includes(navigatePath.slice(1)) : false;
    const isCompactLayout = isTablet || isMobile;

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                backgroundImage: `url(${isCompactLayout ? mobileImageUrl : imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'filter 0.3s ease',
                filter: isActive
                    ? `
                    drop-shadow(0 0 5px ${glowColor})
                    drop-shadow(0 0 7px ${glowColor})
                `
                    : 'none',
                '&:hover': {
                    filter: `
                        drop-shadow(0 0 5px ${glowColor})
                        drop-shadow(0 0 7px ${glowColor})
                    `,
                },
                ...stylesBox,
            }}
            onClick={() => (navigatePath ? navigate(navigatePath) : props.openPopup)}
        >
            <Typography
                sx={{
                    position: 'absolute',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '13px',
                    ...stylesTypography,
                }}
            >
                {label}
            </Typography>
        </Box>
    );
}

export const buttonAppBarData: ButtonAppBarProps[] = [
    {
        label: 'GAME MODES',
        navigate: '/game-modes',
        imageUrl: `${appConfig.url.pathStaticMedia}/play-games-button.f09c3127.svg`,
        mobileImageUrl: `${appConfig.url.pathStaticMedia}/play-games-icon.8f6a057d.svg`,
        glowColor: 'rgba(146, 205, 95, 0.7)',
        stylesBox: {
            width: '190px',
            height: '65px',
        },
        stylesTypography: {
            fontSize: '14px',
            top: 24,
            left: 72,
        },
    },
    {
        label: 'LEADERBOARD',
        navigate: '/leader-board',
        imageUrl: `${appConfig.url.pathStaticMedia}/leaderboard-button.701f323c.svg`,
        mobileImageUrl: `${appConfig.url.pathStaticMedia}/leaderboard-icon.b97816ea.svg`,
        glowColor: 'rgba(87, 188, 255, 0.7)',
        stylesBox: {
            width: '200px',
            height: '60px',
        },
        stylesTypography: {
            top: 23,
            left: 80,
        },
    },
    {
        label: 'CUSTOM SHACK',
        navigate: '/inventory/botbuilder',
        imageUrl: `${appConfig.url.pathStaticMedia}/custom-shack-button.ff9723ea.svg`,
        mobileImageUrl: `${appConfig.url.pathStaticMedia}/custom-shack-icon.193b8ee9.svg`,
        glowColor: 'rgba(255, 82, 182, 0.7)',
        stylesBox: {
            width: '195px',
            height: '59px',
        },
        stylesTypography: {
            top: 25,
            left: 65,
        },
    },
];
