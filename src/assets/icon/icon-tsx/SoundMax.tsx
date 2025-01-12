import { SVGProps } from 'react';
import { appColors } from '../../../themes';
type Props = {} & SVGProps<SVGSVGElement>;

export default function SoundMax(props: Props) {
    return (
        <svg
            width={16}
            height={16}
            viewBox="0 0 24 24"
            data-name="Flat Line"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M11 5v14l-4-4H4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h3Z"
                style={{
                    fill: appColors.white,
                    strokeWidth: 2,
                }}
            />
            <path
                d="M18.36 5.64a9 9 0 0 1 0 12.72"
                style={{
                    fill: 'none',
                    stroke: appColors.white,
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                    strokeWidth: 2,
                }}
            />
            <path
                data-name="primary"
                d="M15.54 8.46a5 5 0 0 1 0 7.08M11 5v14l-4-4H4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h3Z"
                style={{
                    fill: 'none',
                    stroke: appColors.white,
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                    strokeWidth: 2,
                }}
            />
        </svg>
    );
}
