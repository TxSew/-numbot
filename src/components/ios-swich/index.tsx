import { FormControlLabel, FormControlLabelProps, styled, Switch, SwitchProps } from '@mui/material';
import { ReactNode } from 'react';
import { appColors } from '../../themes';

type Props = {
    formProps?: Partial<FormControlLabelProps>;
    iosSwitchProps?: SwitchProps;
    label?: ReactNode;
};

export default function IOSSwitch(props: Props) {
    return (
        <FormControlLabel
            label={props.label ?? ''}
            sx={{ '&.MuiFormControlLabel-root': { margin: 0 } }}
            control={<IOSSwitchStyled sx={{ m: 1 }} {...props.iosSwitchProps} />}
            {...props.formProps}
        />
    );
}

const IOSSwitchStyled = styled((props: SwitchProps) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '& .MuiSwitch-input': {
            left: 'unset',
            width: 'unset',
        },
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: appColors.primary.active,
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color: theme.palette.grey[100],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: 0.7,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: appColors.grey600,
        opacity: 1,
    },
}));
