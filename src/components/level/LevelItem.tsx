import { Box, Typography } from '@mui/material';
import { useExtraSmall, useMobile, useTablet } from '../../hooks/useResponsive';
import { ResponsiveSize } from '../../types/responsive';

interface LevelProps {
    backgroundImage: string;
    cornerImage?: string;
    ratingImage?: string;
    levelText?: string | number;
    item: any;
    isLocked?: boolean;
}

export const LevelItem = ({ backgroundImage, cornerImage, ratingImage, levelText, item, isLocked }: LevelProps) => {
    const isExtraSmall = useExtraSmall();
    const isMobile = useMobile();
    const isTablet = useTablet();

    const itemSize: ResponsiveSize = {
        xs: '80px',
        sm: '95px',
        md: '110px',
        lg: '140px',
        xl: '140px',
    };

    const fontSize: ResponsiveSize = {
        xs: '16px',
        sm: '18px',
        md: '20px',
        lg: '24px',
        xl: '24px',
    };

    const ratingHeight: ResponsiveSize = {
        xs: '45px',
        sm: '62px',
        md: '72px',
        lg: '72px',
        xl: '72px',
    };

    const size = isExtraSmall ? itemSize.xs : isMobile ? itemSize.sm : isTablet ? itemSize.md : itemSize.lg;
    const textSize = isExtraSmall ? fontSize.xs : isMobile ? fontSize.sm : isTablet ? fontSize.md : fontSize.lg;

    const ratingSize = isExtraSmall
        ? ratingHeight.xs
        : isMobile
          ? ratingHeight.sm
          : isTablet
            ? ratingHeight.md
            : ratingHeight.lg;

    return (
        <Box
            sx={{
                background: `url(${backgroundImage}) no-repeat`,
                width: size,
                height: size,
                backgroundPosition: 'center',
                backgroundSize: 'contain',
                position: 'relative',
                cursor: isLocked ? 'default' : 'pointer',
                transition: 'transform 0.2s ease',
                '&:hover': {
                    transform: isLocked ? 'none' : 'scale(1.05)',
                },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {cornerImage && (
                <Box
                    sx={{
                        width: '50%',
                        height: '50%',
                        background: `url(${cornerImage}) no-repeat`,
                        backgroundSize: 'contain',
                        position: 'absolute',
                        left: 1,
                        top: 1,
                    }}
                />
            )}

            {isLocked && (
                <img
                    src={levelLockImageBase64}
                    alt="Locked Icon"
                    style={{
                        position: 'absolute',
                        transform: 'translate(-50%, 0%)',
                        width: isExtraSmall ? '2.5rem' : '4rem',
                        height: ratingSize,
                        bottom: isExtraSmall ? '-.25rem' : '-.5rem',
                        left: '50%',
                    }}
                />
            )}
            {!isLocked && ratingImage && (
                <img
                    src={ratingImage}
                    alt="Rating"
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: ratingSize,
                        bottom: 1,
                        left: '1px',
                    }}
                />
            )}

            <Typography
                variant="caption"
                sx={{
                    fontSize: textSize,
                    fontWeight: 'bold',
                    color: 'white',
                    textAlign: 'center',
                    position: 'absolute',
                    width: '100%',
                    top: !item?.user_levels[0]?.archivedStars ? '45%' : '40%',
                    transform: 'translateY(-50%)',
                    zIndex: 1,
                }}
            >
                {levelText}
            </Typography>
        </Box>
    );
};

const levelLockImageBase64 =
    'data:image/png;base64,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';

export default LevelItem;
