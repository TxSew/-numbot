import { Box, SxProps, Theme } from '@mui/material';
import { PartsBotProgress } from '../../assets/helpers';
import { appConfig } from '../../configs/AppConfig';

export interface BotPart {
    id: number;
    image_name: string;
}

export interface BotConfiguration {
    head: BotPart;
    leg: BotPart;
    body: BotPart;
    lefthand: BotPart;
    righthand: BotPart;
}

type Props = {
    botConfig: BotConfiguration;
    sxProps?: SxProps<Theme>;
};

export default function BotConfiguration({ botConfig, sxProps }: Props) {
    return (
        <Box
            display={'flex'}
            width={'100%'}
            height={'100%'}
            alignItems={'flex-start'}
            justifyContent={'center'}
            textAlign={'center'}
            zIndex={0}
            sx={{
                ...sxProps,
            }}
        >
            <Box
                height={'80%'}
                textAlign={'center'}
                sx={{
                    userSelect: 'none',
                    '@media (max-width: 1285px)': {
                        maxHeight: '100vw !important',
                    },
                }}
            >
                {/* Head */}
                <img
                    style={{
                        width: 'auto',
                        height: '40%',
                        display: 'block',
                    }}
                    src={
                        botConfig?.head?.image_name ??
                        `${appConfig.url.pathBotProgress}/iron-${PartsBotProgress.HEAD}-shaded.svg`
                    }
                />

                <Box
                    height={'25%'}
                    margin={'0 auto'}
                    position={'relative'}
                    display={'inline-block'}
                    alignItems={'center'}
                >
                    {/* Body */}
                    <img
                        style={{
                            position: 'relative',
                            zIndex: 2,
                            height: '100%',
                            width: 'auto',
                            verticalAlign: 'middle',
                        }}
                        src={
                            botConfig?.body?.image_name ??
                            `${appConfig.url.pathBotProgress}/iron-${PartsBotProgress.TORSO}-shaded.svg`
                        }
                    />

                    {/* Arm right */}
                    <img
                        style={{
                            position: 'absolute',
                            height: '361%',
                            bottom: '-101%',
                            right: '99%',
                        }}
                        src={
                            botConfig?.['righthand']?.image_name ??
                            `${appConfig.url.pathBotProgress}/iron-${PartsBotProgress.RIGHT_ARM}-shaded.svg`
                        }
                    />

                    {/* Arm left */}
                    <img
                        style={{
                            position: 'absolute',
                            height: '361%',
                            bottom: '-101%',
                            left: '99%',
                        }}
                        src={
                            botConfig?.['lefthand']?.image_name ??
                            `${appConfig.url.pathBotProgress}/iron-${PartsBotProgress.LEFT_ARM}-shaded.svg`
                        }
                    />
                </Box>

                {/* Legs */}
                <img
                    style={{
                        margin: '0 auto',
                        display: 'block',
                    }}
                    src={
                        botConfig?.leg?.image_name ??
                        `${appConfig.url.pathBotProgress}/iron-${PartsBotProgress.LEGS}-shaded.svg`
                    }
                />
            </Box>
        </Box>
    );
}
