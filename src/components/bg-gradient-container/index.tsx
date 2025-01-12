import { Box } from '@mui/material';
import { ReactNode, useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { gradientColors } from '../../config/gradientColors';
import { listStagesColor } from '../../data/listStages';
import { BackdropProvider } from '../../providers/BackdropProvider';

interface BgGradientContainerProps {
    children: ReactNode;
}

export default function BgGradientContainer(props: BgGradientContainerProps) {
    const { children } = props;
    const location = useLocation();
    const { index } = useParams();

    const { customStyles, startColor, endColor, backgroundImage } = useMemo(() => {
        const routeColors = gradientColors.routes[location.pathname];
        if (routeColors) {
            return {
                startColor: routeColors.startColor,
                endColor: routeColors.endColor,
                customStyles: routeColors.customStyles,
                backgroundImage: routeColors.backgroundImage,
            };
        }

        if (index && location.pathname.includes('/story/')) {
            const stageNumber = parseInt(index, 10);
            const stageColors = gradientColors.stages[stageNumber];
            if (stageColors) {
                return {
                    startColor: stageColors.startColor,
                    endColor: stageColors.endColor,
                    customStyles: stageColors.customStyles,
                };
            }
        }

        return {
            ...gradientColors.default,
            customStyles: gradientColors.default.customStyles,
        };
    }, [location.pathname, index]);

    return (
        <Box
            sx={{
                background:
                    index !== undefined
                        ? listStagesColor[Number(index)].linearGradient
                        : backgroundImage
                          ? `url(${backgroundImage})`
                          : `linear-gradient(to bottom, ${startColor}, ${endColor})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '100vh',
                overflow: 'hidden',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                position: 'relative',
                ...customStyles,
            }}
        >
            <BackdropProvider>{children}</BackdropProvider>
        </Box>
    );
}
