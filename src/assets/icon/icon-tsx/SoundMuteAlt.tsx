import { SVGProps } from 'react';
import { appColors } from '../../../themes';
type Props = {} & SVGProps<SVGSVGElement>;

export default function SoundMuteAlt(props: Props) {
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
                d="m16 14.5 5-5m-5 0 5 5M7 9H4a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h3l4 4V5Z"
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
