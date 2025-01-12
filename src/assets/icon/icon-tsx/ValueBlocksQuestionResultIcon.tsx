import { useSmallerThan } from '../../../hooks/useResponsive';

type Props = {
    isResponsive?: boolean | null;
};
export default function ValueBlocksQuestionResultIcon({ isResponsive = false }: Props) {
    const isXSmall = useSmallerThan('xs');
    const isSmall = useSmallerThan('sm');
    const isMedium = useSmallerThan('md');

    const getDimensions = () => {
        if (isResponsive && !isXSmall) {
            return {
                width: 25,
                height: 25,
                scale: 0.7,
            };
        }
        if (isXSmall) {
            return {
                width: 30,
                height: 30,
                scale: 0.7,
            };
        }
        if (isSmall) {
            return {
                width: 40,
                height: 40,
                scale: 0.85,
            };
        }
        if (isMedium) {
            return {
                width: 20,
                height: 20,
                scale: 1,
            };
        }
        return {
            width: 50,
            height: 50,
            scale: 1.14167,
        };
    };

    const { width, height, scale } = getDimensions();

    return (
        <g transform={`translate(.657)scale(${scale})`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.18 22.18" width={width} height={height}>
                <defs>
                    <style>{'.prefix__cls-2{fill:#1d1d1b}.prefix__cls-3{opacity:.4}.prefix__cls-4{fill:#fff}'}</style>
                </defs>
                <g id="prefix__Layer_2" data-name="Layer 2">
                    <g id="prefix__Layer_1-2" data-name="Layer 1">
                        <rect x={0.48} y={0.48} width={21.22} height={21.22} rx={2.45} fill="#f9b233" />
                        <path
                            className="prefix__cls-2"
                            d="M19.25 1a2 2 0 0 1 2 2v16.25a2 2 0 0 1-2 2H2.93a2 2 0 0 1-2-2V2.93a2 2 0 0 1 2-2h16.32m0-1H2.93a2.94 2.94 0 0 0-2.93 3v16.32a2.94 2.94 0 0 0 2.93 2.93h16.32a2.94 2.94 0 0 0 2.93-2.93V2.93A2.94 2.94 0 0 0 19.25 0z"
                        />
                        <g className="prefix__cls-3">
                            <path
                                className="prefix__cls-4"
                                d="M19.25 1H2.93a2 2 0 0 0-2 2v16.05h2.4V4.39a1.25 1.25 0 0 1 1.26-1.26h16.63v-.2A2 2 0 0 0 19.25 1"
                            />
                        </g>
                        <g className="prefix__cls-3">
                            <path className="prefix__cls-4" d="M.96 17.23 17.23.96h-3.61L.96 13.62z" />
                        </g>
                        <path
                            className="prefix__cls-4"
                            d="M19.53 1 1 19.53a2 2 0 0 0 .63 1.18L20.71 1.62A2 2 0 0 0 19.53 1M6.43 21.21 21.22 6.43V3.44L3.44 21.21z"
                            opacity={0.4}
                        />
                        <path
                            className="prefix__cls-2"
                            d="M18.85 3.12v14.67a1.25 1.25 0 0 1-1.26 1.26H1v.2a2 2 0 0 0 2 2h16.25a2 2 0 0 0 2-2V3.12z"
                            opacity={0.4}
                        />
                    </g>
                </g>
            </svg>
        </g>
    );
}
