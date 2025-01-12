import { useSmallerThan } from "../../../hooks/useResponsive";

export default function SoundButtonIcon() {
    const isXSmall = useSmallerThan('xs');
    const isSmall = useSmallerThan('sm');
    const isMedium = useSmallerThan('md');

    const getDimensions = () => {
        if (isXSmall) {
            return {
                width: 30,
                height: 30,
            };
        }
        if (isSmall) {
            return {
                width: 40,
                height: 40,
            };
        }
        if (isMedium) {
            return {
                width: 50,
                height: 50,
            };
        }
        return {
            width: 50,
            height: 50,
        };
    };

    const { width, height, } = getDimensions();

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75 75" width={width} height={height}>
            <defs>
                <filter id="info-glow" filterUnits="userSpaceOnUse" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation={5} result="blur5" />
                    <feGaussianBlur in="SourceGraphic" stdDeviation={10} result="blur10" />
                    <feColorMatrix
                        result="info-blur"
                        in="blur10"
                        values="0.56 0 0 0 0 0 0.62 0 0 0 0 0 0.64 0 0 0 0 0 1 0"
                    />
                    <feMerge>
                        <feMergeNode in="info-blur" />
                        <feMergeNode in="blur5" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
                <style>
                    {
                        '.cls-microphone-1,.cls-microphone-3{fill:#1d1d1b}.cls-microphone-1{opacity:.23}.cls-microphone-7{fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.63px}'
                    }
                </style>
            </defs>
            <g
                id="Layer_2"
                data-name="Layer 2"
                style={{
                    transform: 'translate(16px,16px)',
                }}
            >
                <g id="Layer_1-2" data-name="Layer 1">
                    <path
                        className="cls-microphone-1"
                        d="M52.85 29.26A26.43 26.43 0 1 1 26.43 2.83a26.42 26.42 0 0 1 26.42 26.43"
                        style={{
                            pointerEvents: 'none',
                        }}
                    />
                    <path
                        d="M26.43 51.39a25.17 25.17 0 1 1 25.16-25.17 25.2 25.2 0 0 1-25.16 25.17"
                        style={{
                            fill: '#8e9da1',
                            pointerEvents: 'none',
                        }}
                    />
                    <path
                        className="cls-microphone-3"
                        d="M26.43 2.12A24.11 24.11 0 1 1 2.32 26.23 24.1 24.1 0 0 1 26.43 2.12m0-2.12a26.22 26.22 0 1 0 26.22 26.22A26.21 26.21 0 0 0 26.43 0"
                        style={{
                            pointerEvents: 'none',
                        }}
                    />
                    <path
                        d="M3.84 27.74A24.1 24.1 0 0 1 44.21 10 24.1 24.1 0 1 0 8.6 42.45q.75.81 1.56 1.56a24 24 0 0 1-6.32-16.27"
                        style={{
                            opacity: 0.6,
                            fill: '#fff',
                            pointerEvents: 'none',
                        }}
                    />
                    <path
                        className="cls-microphone-1"
                        d="M49 24.7A24.1 24.1 0 0 1 8.64 42.49 24.1 24.1 0 1 0 44.21 10c-.48-.53-1-1-1.52-1.52A24 24 0 0 1 49 24.7"
                        style={{
                            pointerEvents: 'none',
                        }}
                    />
                    <path
                        d="M26.43 44.6a18.39 18.39 0 1 1 18.38-18.38A18.38 18.38 0 0 1 26.43 44.6"
                        style={{
                            fill: '#00aaae',
                            pointerEvents: 'none',
                        }}
                    />
                    <path
                        className="cls-microphone-3"
                        d="M26.43 8.9A17.33 17.33 0 1 1 9.1 26.23 17.33 17.33 0 0 1 26.43 8.9m0-2.12a19.45 19.45 0 1 0 19.44 19.45A19.44 19.44 0 0 0 26.43 6.78"
                        style={{
                            pointerEvents: 'none',
                        }}
                    />
                    <path
                        className="cls-microphone-1"
                        d="M42.82 15.79A19.44 19.44 0 0 1 8.07 32.61 19.45 19.45 0 0 0 44.86 20a19.7 19.7 0 0 0-2.04-4.21"
                        style={{
                            pointerEvents: 'none',
                        }}
                    />
                    <path
                        d="M35.8 18.6c-5.64-5.77-13-5.77-18.66 0a2 2 0 0 1-2.61.47c-.6-.5-.77-1.06.07-2.19 6.89-7.38 16.84-7.38 23.73 0 .84 1.12 1.34 2.28-.06 2.83-1.15.44-1.82-.23-2.47-1.11"
                        style={{
                            isolation: 'isolate',
                            opacity: 0.3,
                            fill: '#fff',
                            pointerEvents: 'none',
                        }}
                    />
                    <path
                        className="cls-microphone-7"
                        d="M31.1 30.44a6.22 6.22 0 0 0 0-8.81"
                        style={{
                            pointerEvents: 'none',
                        }}
                    />
                    <path
                        className="cls-microphone-7"
                        d="M33.38 32.72a9.44 9.44 0 0 0 0-13.37"
                        style={{
                            pointerEvents: 'none',
                        }}
                    />
                    <path
                        className="cls-microphone-7"
                        d="M35.74 35.08a12.78 12.78 0 0 0 0-18.09"
                        style={{
                            pointerEvents: 'none',
                        }}
                    />
                    <path
                        d="m26.73 16.64-6.54 4.82a1 1 0 0 1-.59.2h-5.26a1 1 0 0 0-1 1v6.8a1 1 0 0 0 1 1h5.26a1 1 0 0 1 .59.19l6.54 4.82a1 1 0 0 0 1.57-.79V17.43a1 1 0 0 0-1.57-.79"
                        style={{
                            fill: '#fff',
                            pointerEvents: 'none',
                        }}
                    />
                </g>
            </g>
        </svg>
    );
}
