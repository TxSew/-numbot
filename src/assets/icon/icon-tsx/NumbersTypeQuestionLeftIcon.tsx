import { useDesktop, useSmallerThan } from '../../../hooks/useResponsive';
import { appColors } from '../../../themes';

interface NumbersTypeQuestionLeftIconProps {
    equationText: string;
    answerText?: string;
    isResponsive: boolean;
}

export default function NumbersTypeQuestionLeftIcon({
    equationText,
    answerText,
    isResponsive = false,
}: NumbersTypeQuestionLeftIconProps) {
    // console.log('isResponsive', isResponsive);
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
                equationX: 200,
                equationY: 70,
                answerX: 15,
                answerY: 70,
            };
        }
        if (isXSmall) {
            return {
                height: 100,
                width: 300,
                fontSize: 50,
                equationX: 200,
                equationY: 70,
                answerX: 15,
                answerY: 70,
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
                equationX: 200,
                equationY: 70,
                answerX: 15,
                answerY: 70,
            };
        }
        if (isDesktop) {
            return {
                height: 550,
                width: 1100,
                fontSize: 70,
                equationX: 170,
                equationY: 75,
                answerX: 15,
                answerY: 75,
            };
        }
        return {
            height: 450,
            width: 930,
            fontSize: 60,
            equationX: 200,
            equationY: 75,
            answerX: 15,
            answerY: 75,
        };
    };

    const { height, width, answerX, answerY, equationX, equationY, fontSize } = getDimensions();

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 481 100" height={height} width={width}>
            <style>{`.prefix__st0{fill:#fff}.prefix__st1{fill:'#1d1d1b'}`}</style>
            <path
                className="prefix__st0"
                d="M156 1.5v97H15.9C8 98.5 1.6 92.1 1.5 84.2V15.9C1.5 8 7.9 1.5 15.9 1.5z"
            />
            <path
                className="prefix__st1"
                d="M15.9 97C8.8 97 3 91.3 3 84.2V15.9C3 8.8 8.7 3 15.8 3h138.7v94zm0 3h141.6V0H15.9C7.1 0 0 7.1 0 15.9v68.3C0 92.9 7.1 100 15.9 100"
            />
            <path
                d="M12 92.4c-2.8 0-5.5-.9-7.7-2.6 2.1 4.4 6.6 7.2 11.5 7.2h166.1V3h-32.1v26.7l-10 8.3c-6.6 5.3-7.7 14.9-2.5 21.5.7.9 1.5 1.7 2.5 2.5l10 8.3v22.1z"
                opacity={0.2}
                fill="#1d1d1b"
            />
            <path
                d="M465.1 1.5c7.9 0 14.3 6.4 14.4 14.3v68.3c0 7.9-6.4 14.3-14.4 14.3H156.3V67.3L143.9 57c-3.8-3-4.6-8.5-1.6-12.3.5-.6 1-1.1 1.6-1.6l12.4-10.3V1.5z"
                fill="#93c"
            />
            <path
                className="prefix__st1"
                d="M157.8 97V66.6l-12.9-10.7c-3.2-2.4-3.8-7-1.4-10.2.4-.5.9-1 1.4-1.4l12.9-10.7V3h307.4c7.1 0 12.9 5.8 12.9 12.8v68.3c0 7.1-5.8 12.8-12.9 12.8H157.8m-3 3.1h310.4c8.7 0 15.8-7.1 15.9-15.8V15.9C481 7.1 473.9 0 465.1 0H154.8v32L143 41.8c-4.5 3.5-5.3 10-1.8 14.4q.75 1.05 1.8 1.8l11.8 9.9z"
            />
            <path
                className="prefix__st0"
                d="m144.9 55.8 12.9 10.7V97h6.8V72.2l-12.9-10.7c-3.2-2.4-3.8-7-1.4-10.2.4-.5.9-1 1.4-1.4l12.9-10.7V8.6H472c1.5 0 2.9.3 4.3.7-2.3-4-6.5-6.4-11.1-6.4H157.8v30.5l-12.9 10.7c-3.2 2.4-3.9 7-1.4 10.2.3.6.8 1.1 1.4 1.5"
                opacity={0.4}
            />
            <path
                className="prefix__st1"
                d="M472.2 10.3v68.3c0 7.1-5.8 12.8-12.9 12.8H157.8V97h307.4c7.1 0 12.8-5.8 12.9-12.8V15.9c0-4.9-2.8-9.4-7.2-11.6.8 1.9 1.3 3.9 1.3 6"
                opacity={0.3}
            />

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
