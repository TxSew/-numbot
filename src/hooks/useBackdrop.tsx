import { Backdrop, Box, Stack, styled, Typography } from '@mui/material';
import { useState } from 'react';
import { appColors } from '../themes';
import { appConfig } from '../configs/AppConfig';

interface UseBackdropProps {
    text?: string;
}

interface CogConfig {
    size: number;
    left: React.CSSProperties['left'];
    top: React.CSSProperties['top'];
    direction: 'clockwise' | 'counterclockwise';
}

const cogConfigs: CogConfig[] = [
    {
        size: 80,
        left: 35,
        top: 5,
        direction: 'clockwise',
    },
    {
        size: 60,
        left: 0,
        top: -55,
        direction: 'counterclockwise',
    },
    {
        size: 70,
        left: -25,
        top: -5,
        direction: 'clockwise',
    },
];

export const useBackdrop = ({ text = 'Loading' }: UseBackdropProps = {}) => {
    const [openBackdrop, setOpenBackdrop] = useState<boolean>(false);
    const [backdropText, setBackdropText] = useState<string>(text);

    const BackdropComponent = () => (
        <Backdrop
            sx={{
                color: '#fff',
                zIndex: (theme) => theme.zIndex.drawer + 1,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
            }}
            open={openBackdrop}
        >
            <Stack spacing={2} alignItems="center">
                <Box display={'flex'} alignItems={'center'}>
                    {cogConfigs.map((config, index) => (
                        <CogImage
                            key={`cog-${index}`}
                            src={`${appConfig.url.pathStaticMedia}/loading-cog.5c836575.svg`}
                            {...config}
                        />
                    ))}
                </Box>
                <Typography
                    variant="h5"
                    fontWeight={600}
                    textTransform={'uppercase'}
                    sx={{
                        animation: 'blink 1s infinite alternate',
                        '@keyframes blink': {
                            '0%': {
                                color: appColors.success,
                            },
                            '100%': {
                                color: appColors.dark.active,
                            },
                        },
                    }}
                >
                    {backdropText}
                </Typography>
            </Stack>
        </Backdrop>
    );

    return {
        BackdropComponent,
        showBackdrop: (customText?: string) => {
            if (customText) setBackdropText(customText);
            setOpenBackdrop(true);
        },
        hideBackdrop: () => {
            setOpenBackdrop(false);
            setBackdropText(text);
        },
    };
};

const CogImage = styled('img')<CogConfig>`
    position: relative;
    animation: rotate 4s steps(2) infinite;
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
    left: ${(props) => props.left || 0}px;
    top: ${(props) => props.top || 0}px;
    animation-direction: ${(props) => (props.direction === 'clockwise' ? 'normal' : 'reverse')};

    @keyframes rotate {
        0% {
            transform: rotate(0deg);
        }
        25% {
            transform: rotate(90deg);
        }
        50% {
            transform: rotate(180deg);
        }
        75% {
            transform: rotate(270deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;