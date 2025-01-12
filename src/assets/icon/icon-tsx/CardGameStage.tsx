import { appConfig } from '../../../configs/AppConfig';
import { useMobile, useTablet } from '../../../hooks/useResponsive';
import { useResponsiveHeight } from '../../../hooks/useResponsiveHeight';
import { ListStageResponse } from '../../../types/backend';
import { getPartImage, getUnlockedParts, PartsBotProgress } from '../../helpers';
import '../css/numbots.css';

type Props = {
    stage: ListStageResponse;
    isLocked?: boolean | null;
};

export default function CardGameStage(props: Props) {
    const { stage, isLocked } = props;
    const isMobile = useMobile();
    const isTablet = useTablet();
    const isShortHeight = useResponsiveHeight('short');

    const getDimensions = () => {
        if (isMobile) {
            return {
                width: '150px',
                height: isShortHeight ? '280px' : '320px',
            };
        }
        if (isTablet) {
            return {
                width: '200px',
                height: isShortHeight ? '400px' : '440px',
            };
        }
        return {
            width: '260px',
            height: isShortHeight ? '500px' : '550px',
        };
    };

    const { width, height } = getDimensions();

    const stageName = stage.name.toLocaleLowerCase().replace(/\s+/g, '-');
    const unlockedParts = getUnlockedParts(stage.userLevel, stage.totalLevel);

    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 166.79 367.78"
            className={`level-panel-svg ${stageName}-level-panel-svg`}
        >
            <g data-name="Layer 2" className="cls-1">
                <g data-name="Layer 1" transform="matrix(.9 0 0 .95 8.34 9.19)">
                    <g aria-label={`${stageName} stage`}>
                        <rect className="shadow" x={-9.14} y={15.47} width={183.48} height={307.99} rx={9.18} />
                        <path className="cls-2" d="m2.66 288.18 2.77-2.77 6.6 6.6z" />
                        <rect className="cls-3" x={1.14} y={2.28} width={163.48} height={334.36} rx={9.18} />
                        <path
                            className="cls-2"
                            d="M155.44 3.42a8 8 0 0 1 8 8v316a8 8 0 0 1-8 8H10.32a8 8 0 0 1-8-8v-316a8 8 0 0 1 8.05-8zm0-2.27H10.32A10.33 10.33 0 0 0 0 11.46v316a10.32 10.32 0 0 0 10.32 10.31h145.12a10.32 10.32 0 0 0 10.31-10.31v-316a10.33 10.33 0 0 0-10.31-10.31"
                        />
                        <path
                            className="cls-4"
                            d="M158.37 4a8 8 0 0 1 .56 2.94v316a8 8 0 0 1-8 8.05H5.77a8.2 8.2 0 0 1-2.94-.56 8.06 8.06 0 0 0 7.49 5.1h145.12a8 8 0 0 0 8-8v-316A8 8 0 0 0 158.37 4"
                        />
                        <path
                            className="cls-5"
                            d="M6.82 332V16a8 8 0 0 1 8-8H160a8 8 0 0 1 2.94.56 8 8 0 0 0-7.48-5.11H10.32a8 8 0 0 0-8 8v316A8 8 0 0 0 7.38 335a8 8 0 0 1-.56-3"
                        />
                        <rect
                            className={'cls-6'}
                            style={isLocked ? { fill: '#1d1d1b', opacity: 0.3 } : {}}
                            x={15.17}
                            y={15.47}
                            width={135.41}
                            height={307.99}
                            rx={5.86}
                        />
                        <path
                            className="cls-2"
                            d="M144.72 16.55a4.78 4.78 0 0 1 4.78 4.78V317.6a4.78 4.78 0 0 1-4.78 4.78H21a4.78 4.78 0 0 1-4.78-4.78V21.33A4.78 4.78 0 0 1 21 16.55zm0-2.16H21a7 7 0 0 0-6.94 6.94V317.6a7 7 0 0 0 6.94 6.94h123.72a6.94 6.94 0 0 0 6.94-6.94V21.33a7 7 0 0 0-6.94-6.94"
                        />
                        <g className="cls-7">
                            <path
                                className="cls-2"
                                d="M20.8 322.14V25.88a4.78 4.78 0 0 1 4.78-4.78h123.9a4.77 4.77 0 0 0-4.76-4.57H21a4.78 4.78 0 0 0-4.78 4.78V317.6a4.77 4.77 0 0 0 4.57 4.76 1.5 1.5 0 0 1 .01-.22"
                            />
                        </g>
                        <g className="cls-8">
                            <path
                                className="cls-2"
                                d="M82.89 175.35a98.35 98.35 0 0 0-66.64 26.14V317.6a4.78 4.78 0 0 0 4.75 4.78h123.72a4.78 4.78 0 0 0 4.78-4.78V201.45a98.42 98.42 0 0 0-66.61-26.1"
                            />
                        </g>
                        <path className="cls-9" d="M164.63 57.05V2.16h-54.89z" />
                        <path
                            className="cls-10"
                            d="M164.63 54.3a1.1 1.1 0 0 1-.76-.31L112.8 2.92a1.08 1.08 0 0 1 .77-1.84h51.06a1.08 1.08 0 0 1 1.08 1.08v51.06a1.08 1.08 0 0 1-.66 1 1 1 0 0 1-.42.08"
                        />
                        <path
                            className="cls-2"
                            d="M164.63 2.16v51.06L113.57 2.16zm0-2.16h-51.06A2.16 2.16 0 0 0 112 3.69l51.07 51.06a2.15 2.15 0 0 0 1.52.63 2.2 2.2 0 0 0 .83-.16 2.16 2.16 0 0 0 1.33-2V2.16A2.16 2.16 0 0 0 164.63 0"
                        />
                        <path className="cls-5" d="M162.15 4.7H116.1l-2.53-2.54h51.06v51.06l-2.48-2.48z" />
                        <path className="cls-4" d="m117.1 2.16 47.53 47.53v3.53L113.57 2.16z" />
                        <g className="cls-11">
                            <path
                                className="cls-2"
                                d="M139.28 19.1a9.64 9.64 0 1 0 9.64-9.64 9.64 9.64 0 0 0-9.64 9.64"
                            />
                        </g>
                        <path className="cls-12" d="M148.92 25.54a8.72 8.72 0 1 1 3.42-.71 8.6 8.6 0 0 1-3.42.71" />
                        <path
                            className="cls-2"
                            d="M148.91 9a7.79 7.79 0 1 1-3.06.63 7.8 7.8 0 0 1 3.06-.63m0-1.84a9.62 9.62 0 0 0-8.84 13.41 9.63 9.63 0 1 0 8.84-13.37Z"
                        />
                        <g className="cls-13">
                            <path
                                className="cls-14"
                                d="M155.51 15.54a7.78 7.78 0 0 0-14.25-.12A7.78 7.78 0 1 1 156 20a7.7 7.7 0 0 0-.49-4.46"
                            />
                        </g>
                        <g className="cls-15">
                            <path
                                className="cls-2"
                                d="M142.32 18.11a7.77 7.77 0 0 0 14.25.12 7.78 7.78 0 1 1-14.75-4.59 7.8 7.8 0 0 0 .5 4.47"
                            />
                        </g>
                        <path
                            className="cls-16"
                            d="M153.48 23.2a8 8 0 0 1-1.48.8 7.5 7.5 0 0 1-1.81.52l-6-14a7.5 7.5 0 0 1 3.25-1.44Z"
                        />
                        <path
                            className="cls-2"
                            d="M146.39 9.26c.53-.19 1.06-.37 1.58-.51l6.13 14.32c-.46.28-1 .55-1.46.8Zm-1.39.58c-.48.24-.95.49-1.39.76l6.13 14.33c.5-.14 1-.3 1.51-.48Zm-126.19 5.6-3.52 3.52-8.38-8.39zm128.53 308.51 3.52-3.52 8.38 8.38z"
                        />
                        {isLocked && (
                            <>
                                <rect
                                    style={{ opacity: 0.5 }}
                                    x={1.14}
                                    y={2.28}
                                    width={163.48}
                                    height={334.36}
                                    rx={9.18}
                                />
                                <foreignObject width={70} height={70} x={105} y={0} transform="rotate(15 140 30)">
                                    <div
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            backgroundImage: 'url(/assets/images/level-locked.png)',
                                            backgroundSize: 'contain',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: 'center',
                                        }}
                                    />
                                </foreignObject>
                            </>
                        )}
                    </g>
                    <foreignObject
                        width={'80%'}
                        height={30}
                        x={18}
                        y={25}
                        className="level-panel-content"
                        fontSize="1rem"
                    >
                        <div className="level-panel-stage-title" style={{ textAlign: 'center' }}>
                            {stage.name}
                        </div>
                    </foreignObject>
                    <foreignObject
                        width={'70%'}
                        height={30}
                        x={15}
                        y={65}
                        className="level-panel-stage-statistic"
                        fontSize="1rem"
                    >
                        <div
                            className="level-panel-stage-wrapper"
                            style={{
                                display: 'flex',
                                width: '100%',
                                height: '100%',
                                justifyContent: 'center',
                                padding: '0px 10% 0px 25%',
                                alignItems: 'center',
                            }}
                        >
                            <div
                                style={{
                                    backgroundImage: `url(${appConfig.url.pathStaticMedia}/gold-padlock-unlocked.bb2cdcd8.svg)`,
                                    backgroundRepeat: 'no-repeat',
                                    background: 'transparent !important',
                                    fill: '#fff',
                                    backgroundPosition: '50%',
                                    width: '25%',
                                    height: '25px',
                                    flexShrink: 0,
                                    marginRight: '10px',
                                }}
                            />
                            <div
                                className="level-panel-stage-level-stats"
                                style={{
                                    flexGrow: 1,
                                    textAlign: 'start',
                                }}
                            >
                                {stage.userLevel} / {stage.totalLevel}
                            </div>
                        </div>
                    </foreignObject>
                    <foreignObject
                        width={'70%'}
                        height={30}
                        x={15}
                        y={95}
                        className="level-panel-stage-statistic"
                        fontSize="1rem"
                    >
                        <div
                            className="level-panel-stage-wrapper"
                            style={{
                                display: 'flex',
                                width: '100%',
                                height: '100%',
                                justifyContent: 'center',
                                padding: '0px 10% 0px 25%',
                                alignItems: 'center',
                            }}
                        >
                            <div
                                style={{
                                    backgroundImage: `url(${appConfig.url.pathStaticMedia}/gold-star.ea2c08af.svg)`,
                                    backgroundRepeat: 'no-repeat',
                                    background: 'transparent !important',
                                    fill: '#fff',
                                    backgroundPosition: '50%',
                                    width: '25%',
                                    height: '25px',
                                    flexShrink: 0,
                                    marginRight: '10px',
                                }}
                            />
                            <div
                                className="level-panel-stage-level-stats"
                                style={{
                                    flexGrow: 1,
                                    textAlign: 'start',
                                }}
                            >
                                {stage.userStar} / {stage.totalStar}
                            </div>
                        </div>
                    </foreignObject>
                    <foreignObject width={270} height={266} x={47} y={136}>
                        <div
                            className="level-panel-stage-robot"
                            style={{
                                width: 270,
                                height: '239.4px',
                                backgroundImage: `url(${getPartImage(PartsBotProgress.LEFT_ARM, unlockedParts[3], stageName)})`,
                            }}
                        />
                    </foreignObject>
                    <foreignObject width={270} height={266} x={-114} y={136}>
                        <div
                            className="level-panel-stage-robot"
                            style={{
                                width: 270,
                                height: '239.4px',
                                backgroundImage: `url(${getPartImage(PartsBotProgress.RIGHT_ARM, unlockedParts[2], stageName)})`,
                            }}
                        />
                    </foreignObject>
                    <foreignObject width={260} height={74} x={42} y={235}>
                        <div
                            className="level-panel-stage-robot"
                            style={{
                                width: 260,
                                height: '66.6px',
                                backgroundRepeat: 'no-repeat',
                                backgroundImage: `url(${getPartImage(PartsBotProgress.TORSO, unlockedParts[1], stageName)})`,
                            }}
                        />
                    </foreignObject>
                    <foreignObject width={262} height={74} x={-35} y={296}>
                        <div
                            className="level-panel-stage-robot"
                            style={{
                                width: 262,
                                height: '66.6px',
                                backgroundImage: `url(${getPartImage(PartsBotProgress.LEGS, unlockedParts[0], stageName)})`,
                            }}
                        />
                    </foreignObject>
                    <foreignObject width={240} height={200} x={-35} y={130}>
                        <div
                            className="level-panel-stage-robot"
                            style={{
                                width: 240,
                                height: 180,
                                backgroundImage: `url(${getPartImage(PartsBotProgress.HEAD, unlockedParts[4], stageName)})`,
                                backgroundRepeat: 'no-repeat',
                            }}
                        />
                    </foreignObject>
                </g>
            </g>
        </svg>
    );
}
