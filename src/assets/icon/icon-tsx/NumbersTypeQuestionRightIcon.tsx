import { useDesktop, useSmallerThan } from '../../../hooks/useResponsive';
import { appColors } from '../../../themes';

interface NumbersTypeQuestionRightIconProps {
    equationText: string;
    answerText?: string;
    isResponsive?: boolean;
}

export default function NumbersTypeQuestionRightIcon({
    equationText,
    answerText,
    isResponsive = false,
}: NumbersTypeQuestionRightIconProps) {
    // console.log('🚀 ~ answerText:', answerText);
    const isXSmall = useSmallerThan('xs');
    const isSmall = useSmallerThan('sm');
    const isMedium = useSmallerThan('md');
    const isDesktop = useDesktop();
    // console.log('isXSmall', isXSmall);
    // console.log('isSmall', isSmall);
    // console.log('isMedium', isMedium);
    // console.log('isDesktop', isDesktop);

    const getDimensions = () => {
        if (isResponsive) {
            return {
                height: 90,
                width: 200,
                fontSize: 60,
                equationX: 40,
                equationY: 70,
                answerX: 380,
                answerY: 70,
            };
        }
        if (isXSmall) {
            return {
                height: 100,
                width: 300,
                fontSize: 50,
                equationX: 30,
                equationY: 65,
                answerX: 350,
                answerY: 65,
            };
        }
        if (isSmall) {
            return {
                height: 200,
                width: 360,
                fontSize: 50,
                equationX: 28,
                equationY: 65,
                answerX: 330,
                answerY: 65,
            };
        }
        if (isMedium) {
            return {
                height: 200,
                width: 700,
                fontSize: 60,
                equationX: 30,
                equationY: 70,
                answerX: 345,
                answerY: 70,
            };
        }
        if (isDesktop) {
            return {
                height: 703,
                width: 1227,
                fontSize: 60,
                equationX: 20,
                equationY: 70,
                answerX: 350,
                answerY: 70,
            };
        }
        return {
            height: 503,
            width: 927,
            fontSize: 60,
            equationX: 15,
            equationY: 70,
            answerX: 350,
            answerY: 75,
        };
    };

    const { height, width, answerX, answerY, equationX, equationY, fontSize } = getDimensions();

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480.98 99.97" height={height} width={width}>
            <defs>
                <style>
                    {`.prefix__cls-2{fill:#fff}.prefix__cls-3{fill:'#1d1d1b'}`}
                </style>
            </defs>
            <g
                style={{
                    isolation: 'isolate',
                }}
            >
                <g id="prefix__Layer_2" data-name="Layer 2">
                    <g id="prefix__Layer_1-2" data-name="Layer 1">
                        <path
                            className="prefix__cls-2"
                            d="M325 98.47V1.5h140.13a14.36 14.36 0 0 1 14.35 14.35v68.27a14.36 14.36 0 0 1-14.35 14.35z"
                        />
                        <path
                            className="prefix__cls-3"
                            d="M465.13 3A12.85 12.85 0 0 1 478 15.85v68.27A12.85 12.85 0 0 1 465.13 97H326.49V3zm0-3H323.49v100h141.64A15.87 15.87 0 0 0 481 84.12V15.85A15.87 15.87 0 0 0 465.13 0"
                        />
                        <path
                            d="M469 7.62a12.8 12.8 0 0 1 7.7 2.58A12.83 12.83 0 0 0 465.2 3H299.1v94h32.13V70.28l10-8.33a15.28 15.28 0 0 0 0-23.92l-10-8.33V7.62z"
                            opacity={0.2}
                            fill="#1d1d1b"
                            style={{
                                mixBlendMode: 'multiply',
                            }}
                        />
                        <path
                            d="M15.85 98.47A14.37 14.37 0 0 1 1.5 84.12V15.85A14.37 14.37 0 0 1 15.85 1.5h308.88v31.25L337.11 43a8.79 8.79 0 0 1 0 13.92l-12.38 10.31v31.24z"
                            fill="#93c"
                        />
                        <path
                            className="prefix__cls-3"
                            d="M323.23 3v30.45l12.92 10.73a7.28 7.28 0 0 1 0 11.61l-12.92 10.73V97H15.85A12.85 12.85 0 0 1 3 84.12V15.85A12.86 12.86 0 0 1 15.85 3zm3-3H15.85A15.87 15.87 0 0 0 0 15.85v68.27A15.87 15.87 0 0 0 15.85 100h310.38V68l11.84-9.83a10.29 10.29 0 0 0 0-16.23L326.23 32z"
                        />
                        <path
                            className="prefix__cls-3"
                            d="m336.15 44.18-12.92-10.73V3h-6.82v24.84l12.92 10.72a7.29 7.29 0 0 1 0 11.62l-12.92 10.73v30.45H9a12.8 12.8 0 0 1-4.26-.74A12.82 12.82 0 0 0 15.85 97h307.38V66.52l12.92-10.73a7.28 7.28 0 0 0 0-11.61"
                            opacity={0.3}
                        />
                        <path
                            className="prefix__cls-2"
                            d="M8.78 89.74V21.47A12.85 12.85 0 0 1 21.63 8.62h301.6V3H15.85A12.86 12.86 0 0 0 3 15.85v68.27a12.85 12.85 0 0 0 7.23 11.55 12.9 12.9 0 0 1-1.45-5.93"
                            opacity={0.4}
                        />
                    </g>
                </g>
            </g>
            <text
                className="level-text-white"
                fontSize={fontSize}
                fill={appColors.white}
                fontWeight="regular"
                x={equationX}
                y={equationY}
            >
                {equationText}
            </text>
            <text className="level-text-dark" fontSize={fontSize} fontWeight="regular" x={answerX} y={answerY}>
                {answerText}
            </text>
        </svg>
    );
}
