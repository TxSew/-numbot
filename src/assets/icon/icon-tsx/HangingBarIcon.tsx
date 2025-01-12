import { useParams } from 'react-router-dom';
import { listStagesColor } from '../../../data/listStages';
import { useMediaQuery } from 'usehooks-ts';

type Props = {
    hangingBarName: string;
};
export default function HangingBarIcon({ hangingBarName }: Props) {
    const { index } = useParams();
    const isMobile = useMediaQuery('(max-width: 426px)');

    return (
        <svg className="middle-svg" style={{ width: isMobile ? '70%' : '100%' }}>
            <g
                className="hanging-bar"
                style={{
                    transform: 'translate(0rem, 0rem)',
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 184.53 49.52"
                >
                    <g className="cls-1">
                        <g id="Layer_2" data-name="Layer 2">
                            <g id="Layer_1-2" data-name="Layer 1">
                                <g className="cls-2">
                                    <path
                                        className="cls-3"
                                        d="M13.69,49.52c-1.73,0-3.92-1.62-4.85-3.6L.7,28.71a9.66,9.66,0,0,1,0-7.21L8.84,4.28c.93-2,3.12-3.6,4.85-3.6H170.84c1.73,0,3.91,1.62,4.85,3.6l8.13,17.22a9.57,9.57,0,0,1,0,7.21l-8.13,17.21c-.94,2-3.12,3.6-4.85,3.6Z"
                                    />
                                </g>
                                <path
                                    className="cls-4"
                                    d="M15.24,44.46a7,7,0,0,1-5.55-3.58L1.85,26.26a8.23,8.23,0,0,1,0-7.06L9.69,4.59A7,7,0,0,1,15.24,1H169.13a7,7,0,0,1,5.55,3.59l7.84,14.61a8.23,8.23,0,0,1,0,7.06l-7.84,14.62a7,7,0,0,1-5.55,3.58Z"
                                    style={{
                                        fill: index ? listStagesColor[Number(index)].color1 : '#c5cfe0',
                                    }}
                                />
                                <path
                                    className="cls-3"
                                    d="M169.13,2a6,6,0,0,1,4.67,3.06l7.84,14.61a7.27,7.27,0,0,1,0,6.12L173.8,40.4a6,6,0,0,1-4.67,3.06H15.24a6,6,0,0,1-4.67-3.06L2.73,25.79a7.27,7.27,0,0,1,0-6.12L10.57,5.06A6,6,0,0,1,15.24,2H169.13m0-2H15.24A8,8,0,0,0,8.81,4.11L1,18.73a9.22,9.22,0,0,0,0,8L8.81,41.35a8,8,0,0,0,6.43,4.11H169.13a8,8,0,0,0,6.43-4.11l7.84-14.61a9.22,9.22,0,0,0,0-8L175.56,4.11A8,8,0,0,0,169.13,0Z"
                                />
                                <g className="cls-5">
                                    <path
                                        className="cls-6"
                                        d="M3.45,21.81,11.28,7.2A6,6,0,0,1,16,4.14H169.84a6,6,0,0,1,4.67,3.06l7.72,14.39a5.92,5.92,0,0,0-.59-1.92L173.8,5.06A6,6,0,0,0,169.13,2H15.24a6,6,0,0,0-4.67,3.06L2.73,19.67a7.27,7.27,0,0,0,0,6.12l.12.23A7.17,7.17,0,0,1,3.45,21.81Z"
                                    />
                                </g>
                                <g className="cls-7">
                                    <path
                                        className="cls-3"
                                        d="M180.84,23.62,173,38.23a6,6,0,0,1-4.67,3.06H14.45a6,6,0,0,1-4.68-3.06L2.06,23.84a5.63,5.63,0,0,0,.59,1.91l7.84,14.62a6,6,0,0,0,4.67,3.06H169a6.05,6.05,0,0,0,4.68-3.06l7.83-14.62a7.18,7.18,0,0,0,0-6.11l-.12-.23A7.2,7.2,0,0,1,180.84,23.62Z"
                                    />
                                </g>
                                <path
                                    d="M17.5,38.22a5.07,5.07,0,0,1-3.79-2.53l-5.37-10a6.3,6.3,0,0,1,0-5.17L14.09,9.77a5.08,5.08,0,0,1,3.79-2.53H166.49a5.08,5.08,0,0,1,3.79,2.53L176,20.5a6.3,6.3,0,0,1,0,5.17l-5.37,10a5.07,5.07,0,0,1-3.79,2.53Z"
                                    style={{
                                        fill: index ? listStagesColor[Number(index)].color2 : 'url(#noIndexGradient)',
                                    }}
                                />
                                <defs>
                                    <linearGradient id="noIndexGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" style={{ stopColor: '#151d1d' }} />
                                        <stop offset="100%" style={{ stopColor: '#3d686d' }} />
                                    </linearGradient>
                                </defs>
                                <path
                                    className="cls-3"
                                    d="M166.49,8.24a4.16,4.16,0,0,1,2.91,2L175.15,21a5.36,5.36,0,0,1,0,4.23l-5.37,10a4.14,4.14,0,0,1-2.91,2H17.5a4.14,4.14,0,0,1-2.91-2l-5.37-10a5.36,5.36,0,0,1,0-4.23L15,10.25a4.14,4.14,0,0,1,2.91-2H166.49m0-2H17.88A6,6,0,0,0,13.21,9.3L7.46,20a7.2,7.2,0,0,0,0,6.12l5.37,10a6,6,0,0,0,4.67,3.06H166.87a6,6,0,0,0,4.67-3.06l5.37-10a7.27,7.27,0,0,0,0-6.12L171.16,9.3a6,6,0,0,0-4.67-3.06Z"
                                />
                                <g className="cls-7">
                                    <path
                                        className="cls-3"
                                        d="M9.63,25.1l5.91-11a6.19,6.19,0,0,1,4.8-3.14H171a4,4,0,0,1,1.15.19l-1-1.83a6,6,0,0,0-4.67-3.06H17.88A6,6,0,0,0,13.21,9.3L7.46,20a7.2,7.2,0,0,0,0,6.12L9,29A7.18,7.18,0,0,1,9.63,25.1Z"
                                    />
                                </g>
                                <path
                                    className="cls-9"
                                    d="M167,14.6c0,2-1.29,3.61-2.89,3.61H20.71c-1.6,0-2.89-1.62-2.89-3.61h0c0-2,1.29-3.6,2.89-3.6H164.15c1.6,0,2.89,1.61,2.89,3.6Z"
                                />
                            </g>
                        </g>
                    </g>
                </svg>
                <text className="text-level" x="50%" y="50%" textAnchor="middle">
                    {hangingBarName}
                </text>
            </g>
        </svg>
    );
}
