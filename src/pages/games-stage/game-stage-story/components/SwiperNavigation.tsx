import { Box } from '@mui/material';
import { useResponsiveHeight } from '../../../../hooks/useResponsiveHeight';
import { useParams } from 'react-router-dom';
import { listStagesColor } from '../../../../data/listStages';
import { appConfig } from '../../../../configs/AppConfig';

interface SwiperButtonProps {
    direction: 'prev' | 'next';
}
export default function SwiperNavigation() {
    return (
        <>
            <SwiperButton direction="prev" />
            <SwiperButton direction="next" />
        </>
    );
}

function SwiperButton({ direction }: SwiperButtonProps) {
    const { index } = useParams()
    const isShortHeight = useResponsiveHeight('short');
    const isNext = direction === 'next';

    return (
        <Box
            className={`swiper-button-${direction}`}
            sx={{
                width: !index && isShortHeight ? '36px' : '56px',
                height: !index && isShortHeight ? '36px' : '56px',
                backgroundImage: !index ? `url('${appConfig.url.pathStaticMedia}/${isNext ? 'right' : 'left'}-arrow.${isNext ? '6e2926f9' : '7b078b1b'}.svg')` : 'none',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                '&::after': {
                    display: 'none',
                },
                position: 'absolute',
                [isNext ? 'right' : 'right']: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                cursor: 'pointer',
                '@keyframes float': !index ? {
                    '0%, 100%': {
                        transform: 'translateY(-50%)',
                    },
                    '50%': {
                        transform: 'translateY(calc(-50% - 5px))',
                    },
                } : {},
                '&:hover': {
                    animation: 'float 1s ease-in-out infinite',
                },
            }}
        >
            {
                index && (
                    <svg
                        className={`challenge-icon-${isNext ? 'next' : 'prev'} hvr-bob`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 35.12 47.44"
                        aria-label={`${isNext ? "next" : 'previous'} levels`}
                        style={{
                            visibility: "visible",
                            height: 674,
                        }}
                    >
                        <g data-name="Layer 2" className="cls-1">
                            {
                                isNext ? (
                                    <g data-name="Layer 1" display={index ? "block" : "none"}>
                                        <path
                                            className="cls-2"
                                            d="M4.09 25.22.17 9.76a5.29 5.29 0 0 1 1-4.65A5.65 5.65 0 0 1 5.55 3a5.53 5.53 0 0 1 3.28 1.08l23 16.78a5.37 5.37 0 0 1 0 8.73l-23 16.78a5.57 5.57 0 0 1-3.28 1.07 5.65 5.65 0 0 1-4.39-2.11 5.27 5.27 0 0 1-1-4.64Z"
                                        />
                                        <path
                                            d="M7.55 42.24a3.56 3.56 0 0 1-2.81-1.38 3.45 3.45 0 0 1-.63-3L8.06 22a1.54 1.54 0 0 0 0-.74L4.11 5.39a3.45 3.45 0 0 1 .63-3A3.59 3.59 0 0 1 7.54 1a3.5 3.5 0 0 1 2.1.7l23 17.08a3.54 3.54 0 0 1 0 5.68l-23 17.08a3.5 3.5 0 0 1-2.09.7"
                                            style={{
                                                fill: listStagesColor[Number(index)]?.color1,
                                            }}
                                        />
                                        <path
                                            className="cls-4"
                                            d="M7.55 2A2.5 2.5 0 0 1 9 2.51l23.1 17.08a2.54 2.54 0 0 1 0 4.07L9 40.74a2.47 2.47 0 0 1-1.49.5 2.54 2.54 0 0 1-2.47-3.15L9 22.23A2.5 2.5 0 0 0 9 21L5.08 5.15A2.53 2.53 0 0 1 7.55 2m0-2A4.59 4.59 0 0 0 4 1.77a4.46 4.46 0 0 0-.81 3.87l4 15.85a.6.6 0 0 1 0 .26L3.14 37.61A4.47 4.47 0 0 0 4 41.48a4.61 4.61 0 0 0 3.6 1.76 4.46 4.46 0 0 0 2.68-.9l23.01-17.08a4.54 4.54 0 0 0 0-7.28L10.23.9A4.46 4.46 0 0 0 7.55 0"
                                        />
                                        <g className="cls-5">
                                            <path
                                                className="cls-6"
                                                d="M30.1 21.59 7 4.51a2.42 2.42 0 0 0-2-.45 2.53 2.53 0 0 1 4-1.55l23.1 17.08a2.54 2.54 0 0 1 0 4.07l-1.1.85a2.53 2.53 0 0 0-.9-2.92"
                                            />
                                        </g>
                                        <g className="cls-7">
                                            <path
                                                className="cls-4"
                                                d="M5.19 37.67 9 22.23A2.5 2.5 0 0 0 9 21L5.08 5.15a2.52 2.52 0 0 1 2-3.09 2.4 2.4 0 0 0 0 1.09L11 19c1.41 6.61 1 9.89.85 10.29l-2.61-2-2.16 8.8A2.67 2.67 0 0 0 8.55 39a3.4 3.4 0 0 0 .45-.26l23.1-17.08a2.6 2.6 0 0 0 .81-1 2.54 2.54 0 0 1-.81 3L9 40.74a2.53 2.53 0 0 1-4-2.65Z"
                                            />
                                        </g>
                                        <path className="cls-4" d="m7.24 13.83 4.64 15.47-4.73-3.65z" />
                                    </g>
                                ) : (
                                    <g data-name="Layer 1" display={index ? "block" : "none"}>
                                        <path
                                            className="cls-2"
                                            d="m31 25.22 4-15.46a5.29 5.29 0 0 0-1-4.65A5.65 5.65 0 0 0 29.58 3a5.54 5.54 0 0 0-3.29 1.08l-23 16.78a5.37 5.37 0 0 0 0 8.73l23 16.78a5.6 5.6 0 0 0 7.67-1 5.27 5.27 0 0 0 1-4.64Z"
                                        />
                                        <path
                                            d="M27.58 42.24a3.53 3.53 0 0 1-2.1-.7l-23-17.08a3.54 3.54 0 0 1 0-5.68l23-17.08a3.53 3.53 0 0 1 2.1-.7 3.62 3.62 0 0 1 2.81 1.38 3.48 3.48 0 0 1 .62 3l-4 15.86a1.54 1.54 0 0 0 0 .74l4 15.86a3.48 3.48 0 0 1-.62 3 3.59 3.59 0 0 1-2.81 1.4"
                                            style={{
                                                fill: listStagesColor[Number(index)]?.color1,
                                            }}
                                        />
                                        <path
                                            className="cls-4"
                                            d="M27.58 2A2.53 2.53 0 0 1 30 5.15L26.09 21a2.5 2.5 0 0 0 0 1.22L30 38.09a2.53 2.53 0 0 1-2.46 3.15 2.48 2.48 0 0 1-1.5-.5L3 23.66a2.54 2.54 0 0 1 0-4.07L26.08 2.51a2.5 2.5 0 0 1 1.5-.51m0-2a4.47 4.47 0 0 0-2.69.9L1.83 18a4.54 4.54 0 0 0 0 7.28l23.06 17.06a4.47 4.47 0 0 0 2.69.9 4.61 4.61 0 0 0 3.59-1.76 4.47 4.47 0 0 0 .83-3.87l-4-15.86a.6.6 0 0 1 0-.26l4-15.85a4.46 4.46 0 0 0-.81-3.87A4.57 4.57 0 0 0 27.58 0"
                                        />
                                        <g className="cls-5">
                                            <path
                                                className="cls-6"
                                                d="M5 21.59 28.08 4.51a2.42 2.42 0 0 1 2-.45 2.53 2.53 0 0 0-4-1.55L3 19.59a2.54 2.54 0 0 0 0 4.07l1.16.85A2.51 2.51 0 0 1 5 21.59"
                                            />
                                        </g>
                                        <g className="cls-7">
                                            <path
                                                className="cls-4"
                                                d="m29.94 37.67-3.85-15.44a2.5 2.5 0 0 1 0-1.22L30 5.15a2.51 2.51 0 0 0-2-3.09 2.4 2.4 0 0 1 0 1.09L24.09 19c-1.41 6.61-.95 9.89-.85 10.29l2.61-2 2.15 8.8A2.67 2.67 0 0 1 26.57 39a4 4 0 0 1-.49-.28L3 21.66a2.5 2.5 0 0 1-.8-1 2.53 2.53 0 0 0 .8 3l23.08 17.08a2.53 2.53 0 0 0 4-2.65Z"
                                            />
                                        </g>
                                        <path className="cls-4" d="M27.88 13.83 23.24 29.3l4.73-3.65z" />
                                    </g>
                                )
                            }
                        </g>
                    </svg>
                )
            }
        </Box>
    );
}
