import { Stack, styled } from '@mui/material';
import HangingBarIcon from '../../../assets/icon/icon-tsx/HangingBarIcon';

interface HangingBarProps {
    label: string;
}

const StyledStack = styled(Stack)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

export default function HangingBar(props: HangingBarProps) {
    return (
        <StyledStack direction="row">
            <HangingBarIcon hangingBarName={props.label} />
        </StyledStack>
    );
}
