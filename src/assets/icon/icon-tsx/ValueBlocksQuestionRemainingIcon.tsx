import { useSmallerThan } from '../../../hooks/useResponsive';

type Props = {
    isResponsive?: boolean | null;
};

export default function ValueBlocksQuestionRemainingIcon({ isResponsive = false }: Props) {
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
        <g transform={`translate(342.49)scale(${scale})`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.18 22.18" width={width} height={height}>
                <defs>
                    <style>{'.prefix__cls-2{fill:#1d1d1b}'}</style>
                </defs>
                <g id="prefix__Layer_2" data-name="Layer 2">
                    <g id="prefix__Layer_1-2" data-name="Layer 1">
                        <rect x={0.48} y={0.48} width={21.22} height={21.22} rx={2.45} fill="#515b5d" />
                        <path
                            className="prefix__cls-2"
                            d="M19.25 1a2 2 0 0 1 2 2v16.25a2 2 0 0 1-2 2H2.93a2 2 0 0 1-2-2V2.93a2 2 0 0 1 2-2h16.32m0-1H2.93a2.94 2.94 0 0 0-2.93 3v16.32a2.94 2.94 0 0 0 2.93 2.93h16.32a2.94 2.94 0 0 0 2.93-2.93V2.93A2.94 2.94 0 0 0 19.25 0z"
                        />
                        <path
                            className="prefix__cls-2"
                            d="M2.83 3.8a1.09 1.09 0 0 1 1.08-1.08H21.2A2 2 0 0 0 19.25 1H2.93a2 2 0 0 0-2 2v16.25a2 2 0 0 0 1.87 2z"
                            opacity={0.4}
                        />
                    </g>
                </g>
            </svg>
        </g>
    );
}
