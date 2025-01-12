type GradientColors = {
    startColor: string;
    endColor: string;
    backgroundImage?: string;
    customStyles?: Record<string, any>;
};

type RouteGradients = {
    default: GradientColors;
    routes: Record<string, GradientColors>;
    stages: Record<number, GradientColors>;
};

export const gradientColors: RouteGradients = {
    default: {
        startColor: '#131e20',
        endColor: '#4c6d74',
    },
    routes: {
        '/': {
            startColor: '#131e20',
            endColor: '#4c6d74',
        },
        '/game-modes': {
            startColor: '#1a2729',
            endColor: '#4e6e75',
            customStyles: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(10px)',
            },
        },
        '/game-modes/story': {
            startColor: '#4e6e75',
            endColor: '#4e6e75',
            customStyles: {
                position: 'relative',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    zIndex: 0,
                },
            },
        },
        '/inventory/botbuilder': {
            startColor: '#1c2426',
            endColor: 'red',
            backgroundImage: '/assets/images/custom-shack-background.jpg',
            customStyles: {
                backgroundPosition: 'calc(50% - 16vw) top',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                animation: `bb-page-animation 3s ease-in-out`,
                '@keyframes bb-page-animation': {
                    '0%': {
                        backgroundPositionX: '50%',
                    },
                    '100%': {
                        backgroundPositionX: 'calc(50% - 16vw)',
                    },
                },
                '@media (max-width: 1285px)': {
                    background: 'url(/assets/images/custom-shack-background-mobile.jpg)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: '50%',
                    animation: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    width: '100%',
                },
            },
        },
    },
    stages: {
        1: {
            startColor: '#162226',
            endColor: 'red',
            // backgroundImage: '/assets/images/stages/stage1-bg.jpg',
        },
        2: {
            startColor: '#1d2b2f',
            endColor: '#5a868f',
            // backgroundImage: '/assets/images/stages/stage2-bg.jpg',
        },
    },
};
