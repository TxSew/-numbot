import { useParams } from 'react-router-dom';
import { listStagesColor } from '../../../data/listStages';
import { appColors } from '../../../themes';

type Props = {
    currentQuestion: number;
    totalQuestion: number;
    isIncorrect: boolean;
    isCorrect: boolean;
    correctAnswers: number;
};

export default function AnswersStory({ currentQuestion, totalQuestion, isIncorrect, isCorrect, correctAnswers }: Props) {
    const { index } = useParams()

    const radius = 29;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (correctAnswers / totalQuestion) * circumference;
    const fillColor = isIncorrect ? appColors.danger : isCorrect ? appColors.success : listStagesColor[Number(index)].color2;

    return (
        <svg className="answers-story">
            <defs>
                <filter id="back-glow" filterUnits="userSpaceOnUse" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation={5} result="blur5" />
                    <feGaussianBlur in="SourceGraphic" stdDeviation={10} result="blur10" />
                    <feColorMatrix
                        result="back-blur"
                        in="blur10"
                        type="matrix"
                        values="0.56 0 0 0 0 0 0.62 0 0 0 0 0 0.64 0 0 0 0 0 1 0"
                    />
                    <feMerge>
                        <feMergeNode in="back-blur" />
                        <feMergeNode in="blur5" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
                <filter id="info-glow" filterUnits="userSpaceOnUse" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation={5} result="blur5" />
                    <feGaussianBlur in="SourceGraphic" stdDeviation={10} result="blur10" />
                    <feColorMatrix
                        result="info-blur"
                        in="blur10"
                        type="matrix"
                        values="0.56 0 0 0 0 0 0.62 0 0 0 0 0 0.64 0 0 0 0 0 1 0"
                    />
                    <feMerge>
                        <feMergeNode in="info-blur" />
                        <feMergeNode in="blur5" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>
            <g>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 104.35 106.99">
                    <g className="answer-background-story" >
                        <g className="background cls-1" >
                            <g id="Layer_2" data-name="Layer 2">
                                <g id="Layer_1-2" data-name="Layer 1">
                                    <g className="cls-2">
                                        <path
                                            className="cls-3"
                                            d="M104.35,54.57A52.18,52.18,0,1,1,51.93,2.64,52.17,52.17,0,0,1,104.35,54.57Z"
                                        />
                                    </g>
                                    <path
                                        d="M52.17,100.66A49.83,49.83,0,0,1,51.94,1h.24a49.83,49.83,0,0,1,.23,99.66Z"
                                        style={{
                                            fill: listStagesColor[Number(index)].color1,
                                        }}
                                    />
                                    <path
                                        className="cls-3"
                                        d="M52.18,2a48.83,48.83,0,0,1,.22,97.66h-.23A48.83,48.83,0,0,1,52,2h.23m0-2h-.25a50.83,50.83,0,0,0,.23,101.66h.24A50.83,50.83,0,0,0,52.19,0Z"
                                    />
                                    <g className="cls-2">
                                        <path
                                            className="cls-3"
                                            d="M85.88,15.52a48.82,48.82,0,0,1-69,69,48.82,48.82,0,1,0,69-69Z"
                                        />
                                    </g>
                                    <g className="cls-5">
                                        <path
                                            className="cls-6"
                                            d="M4.94,52.65A48.81,48.81,0,0,1,87.47,17.11a48.81,48.81,0,1,0-69,69A48.61,48.61,0,0,1,4.94,52.65Z"
                                        />
                                    </g>
                                    <path
                                        d="M52.17,92.15A41.32,41.32,0,0,1,52,9.51h.2a41.32,41.32,0,0,1,.19,82.64Z"
                                        style={{
                                            fill: fillColor,
                                        }}
                                    />
                                    <path
                                        className="cls-3"
                                        d="M52.18,10.51a40.32,40.32,0,0,1,.18,80.64h-.19A40.32,40.32,0,0,1,52,10.51h.19m0-2H52a42.32,42.32,0,0,0,.19,84.64h.2a42.32,42.32,0,0,0-.19-84.64Z"
                                    />
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>

                <svg className="progress-bar-empty-svg-image" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 101">
                    <g
                        className="image cls-1"
                        style={{
                            transform: 'translate(13px, 12px)',

                        }}
                    >
                        <g id="Layer_2" data-name="Layer 2">
                            <g id="Layer_1-2" data-name="Layer 1">
                                <circle
                                    className="progress-bar"
                                    cx={-27}
                                    cy={43}
                                    r={29}
                                    strokeWidth={13}
                                    style={{
                                        strokeDashoffset: strokeDashoffset,
                                        stroke: appColors.success,
                                    }}
                                />
                                <path
                                    className="cls-2"
                                    d="M36.38,71.16c-.75,0-1.51,0-2.27-.07A35.34,35.34,0,0,1,29.48,1.16a6.28,6.28,0,0,1,6.9,3.48,6.34,6.34,0,0,1,6.94-3.47,35.34,35.34,0,0,1-6.94,70Zm0-60.63A6.26,6.26,0,0,1,32,14a22.29,22.29,0,0,0,4.4,44.15h0A22,22,0,0,0,38.94,58,22.29,22.29,0,0,0,41,14,6.58,6.58,0,0,1,36.39,10.53Z"
                                />
                                <path
                                    className="cls-3"
                                    d="M30.7,2.08A5.36,5.36,0,0,1,36,7.45v.28A5.29,5.29,0,0,1,31.78,13a23.33,23.33,0,0,0,4.6,46.21A24.34,24.34,0,0,0,39.06,59a23.33,23.33,0,0,0,2.13-46,5.43,5.43,0,0,1-4.41-5.27V7.46a5.36,5.36,0,0,1,5.31-5.37,5.21,5.21,0,0,1,1,.1,34.3,34.3,0,0,1-6.74,67.93c-.73,0-1.46,0-2.2-.07A34.3,34.3,0,0,1,29.69,2.18a5.86,5.86,0,0,1,1-.1M30.7,0h0a7.59,7.59,0,0,0-1.42.14,36.38,36.38,0,0,0,4.77,72c.77.05,1.56.07,2.33.07a36.38,36.38,0,0,0,7.15-72A7,7,0,0,0,42.09,0a7.35,7.35,0,0,0-5.71,2.71A7.3,7.3,0,0,0,30.7,0Zm5.68,57.07A21.24,21.24,0,0,1,32.19,15a7.26,7.26,0,0,0,4.21-2.56A7.71,7.71,0,0,0,40.76,15a21.25,21.25,0,0,1-1.93,41.9,22.47,22.47,0,0,1-2.45.13Z"
                                />
                                <g className="cls-4">
                                    <path
                                        className="cls-3"
                                        d="M43.12,2.19a5.35,5.35,0,0,0-6.34,5.27v.27a5.06,5.06,0,0,0,.06.69,5,5,0,0,1,5.87-4.18,32.23,32.23,0,1,1-12.62,0,5,5,0,0,1,5.83,4.21A5.67,5.67,0,0,0,36,7.73V7.45a5.33,5.33,0,0,0-6.29-5.27,34.3,34.3,0,1,0,13.43,0Z"
                                    />
                                </g>
                            </g>
                        </g>
                    </g>
                    <text className="top-text">{currentQuestion}</text>
                    <line className="text-delimiter" x1={0} y1={0} x2={35} y2={0} stroke="white" strokeWidth="2px" />
                    <text className="bottom-text">{totalQuestion}</text>
                </svg>
            </g>
        </svg>
    );
}
