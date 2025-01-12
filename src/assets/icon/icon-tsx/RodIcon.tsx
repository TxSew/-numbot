import '../css/numbots.css';
import { listStagesColor } from '../../../data/listStages';
import { useParams } from 'react-router-dom';

export default function RodGame() {
    const { index } = useParams()

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 235.33 18.87" className="rod">
            <g>
                <g className="cls-1">
                    <g id="Layer_2" data-name="Layer 2">
                        <g id="Layer_1-2" data-name="Layer 1">
                            <rect className="cls-2" y={4.33} width={235.33} height={14.54} />
                            <rect className="cls-3" width={235.33} height={14.54} />
                            <rect
                                y={2.14}
                                width={235.33}
                                height={10.34}
                                style={{
                                    fill: listStagesColor[Number(index)].color1,
                                }}
                            />
                            <rect className="cls-5" y={9.73} width={235.33} height={2.75} />
                            <rect className="cls-6" y={2.14} width={235.33} height={1.62} />
                            <line className="cls-7" x1={13.86} y1={1.07} x2={13.86} y2={12.48} />
                            <line className="cls-7" x1={21.84} y1={1.07} x2={21.84} y2={12.48} />
                            <line className="cls-7" x1={29.82} y1={1.07} x2={29.82} y2={12.48} />
                            <line className="cls-7" x1={37.8} y1={1.07} x2={37.8} y2={12.48} />
                            <line className="cls-7" x1={45.78} y1={1.07} x2={45.78} y2={12.48} />
                            <line className="cls-7" x1={53.76} y1={1.07} x2={53.76} y2={12.48} />
                            <line className="cls-7" x1={61.74} y1={1.07} x2={61.74} y2={12.48} />
                            <line className="cls-7" x1={69.72} y1={1.07} x2={69.72} y2={12.48} />
                            <line className="cls-7" x1={77.7} y1={1.07} x2={77.7} y2={12.48} />
                            <line className="cls-7" x1={85.68} y1={1.07} x2={85.68} y2={12.48} />
                            <line className="cls-7" x1={93.66} y1={1.07} x2={93.66} y2={12.48} />
                            <line className="cls-7" x1={101.64} y1={1.07} x2={101.64} y2={12.48} />
                            <line className="cls-7" x1={109.62} y1={1.07} x2={109.62} y2={12.48} />
                            <line className="cls-7" x1={117.6} y1={1.07} x2={117.6} y2={12.48} />
                            <line className="cls-7" x1={125.58} y1={1.07} x2={125.58} y2={12.48} />
                            <line className="cls-7" x1={133.56} y1={1.07} x2={133.56} y2={12.48} />
                            <line className="cls-7" x1={141.54} y1={1.07} x2={141.54} y2={12.48} />
                            <line className="cls-7" x1={149.51} y1={1.07} x2={149.51} y2={12.48} />
                            <line className="cls-7" x1={157.5} y1={1.07} x2={157.5} y2={12.48} />
                            <line className="cls-7" x1={165.47} y1={1.07} x2={165.47} y2={12.48} />
                            <line className="cls-7" x1={173.45} y1={1.07} x2={173.45} y2={12.48} />
                            <line className="cls-7" x1={181.43} y1={1.07} x2={181.43} y2={12.48} />
                            <line className="cls-7" x1={189.41} y1={1.07} x2={189.41} y2={12.48} />
                            <line className="cls-7" x1={197.39} y1={1.07} x2={197.39} y2={12.48} />
                            <line className="cls-7" x1={205.37} y1={1.07} x2={205.37} y2={12.48} />
                            <line className="cls-7" x1={213.35} y1={1.07} x2={213.35} y2={12.48} />
                            <line className="cls-7" x1={221.33} y1={1.07} x2={221.33} y2={12.48} />
                            <line className="cls-7" x1={5.88} y1={1.07} x2={5.88} y2={12.48} />
                            <line className="cls-7" x1={229.31} y1={1.07} x2={229.31} y2={12.48} />
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
}
