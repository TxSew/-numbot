import { Box, FormControlLabel, Grid2, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import SoundMax from '../../../assets/icon/icon-tsx/SoundMax';
import SoundMuteAlt from '../../../assets/icon/icon-tsx/SoundMuteAlt';
import IOSSwitch from '../../ios-swich';
import PopupBaseComponent from '../../pop-up';
import { initialKeyboardKeys, KeyboardKey, SettingIosSwitchItem, swapItemKeyBoard } from '../configs';
import { IPopUp } from '../../../hooks/usePopUp';
import { appConfig } from '../../../configs/AppConfig';

type Props = IPopUp & {};

export default function PopupSettingsContent(props: Props) {
    const { open, onClose } = props;
    const [keyboardKeys, setKeyboardKeys] = useState<KeyboardKey[]>(initialKeyboardKeys);
    const [settingsIosSwitch, setSettingsIosSwitch] = useState<SettingIosSwitchItem[]>(initialSettings);

    const handleToggleIosSwitch = (id: string) => {
        setSettingsIosSwitch((prev) =>
            prev.map((item) => (item.id === id ? { ...item, isChecked: !item.isChecked } : item))
        );
    };

    const handleTopRowToggle = (id: string) => {
        const sourceIndices = [0, 1, 2];
        const targetIndices = [6, 7, 8];

        setKeyboardKeys((prevKeys) => {
            const isSwapped = settingsIosSwitch.find((item) => item.id === id)?.isChecked;

            return isSwapped
                ? swapItemKeyBoard(prevKeys, targetIndices, sourceIndices)
                : swapItemKeyBoard(prevKeys, sourceIndices, targetIndices);
        });

        handleToggleIosSwitch(id);
    };

    return (
        <PopupBaseComponent
            open={open}
            onClose={onClose}
            title={
                <Typography
                    sx={{
                        position: 'absolute',
                        top: 50,
                        fontSize: '32px',
                        fontWeight: 500,
                    }}
                >
                    Settings
                </Typography>
            }
            dialogTitle={
                <img
                    src={`${appConfig.url.pathStaticMedia}/close-panel-cross.daaee7cb.svg`}
                    alt=""
                    style={{
                        width: '56px',
                        height: '56px',
                        cursor: 'pointer',
                        margin: '0 auto',
                    }}
                    onClick={onClose}
                />
            }
            descContent={
                <Stack direction={'column'} spacing={2} alignItems={'center'}>
                    {settingsIosSwitch.map((setting) => (
                        <FormControlLabel
                            key={setting.id}
                            sx={{
                                '.MuiFormControlLabel-label': {
                                    mb: '8px',
                                    fontWeight: 'bold',
                                    fontSize: '16px',
                                },
                            }}
                            control={
                                <Stack direction={'row'} alignItems={'center'}>
                                    {setting.icons?.left}
                                    <IOSSwitch
                                        iosSwitchProps={{
                                            checked: setting.isChecked,
                                            onChange() {
                                                setting.id === 'numpadTopRow'
                                                    ? handleTopRowToggle(setting.id)
                                                    : handleToggleIosSwitch(setting.id);
                                            },
                                        }}
                                    />
                                    {setting.icons?.right}
                                </Stack>
                            }
                            labelPlacement="top"
                            label={setting.label}
                        />
                    ))}
                    <Grid2 container justifyContent={'center'}>
                        {keyboardKeys.map((button, index) => (
                            <Grid2 key={index}>
                                <Box
                                    sx={{
                                        width: '88px',
                                        height: '40px',
                                        backgroundRepeat: 'no-repeat',
                                        background: `url(${button.imageUrl})`,
                                        backgroundSize: 'contain',
                                        cursor: 'pointer',
                                    }}
                                />
                            </Grid2>
                        ))}
                    </Grid2>
                </Stack>
            }
        />
    );
}

export const initialSettings: SettingIosSwitchItem[] = [
    {
        id: 'soundEffects',
        label: 'Sound Effects',
        isChecked: false,
        icons: { left: <SoundMuteAlt />, right: <SoundMax /> },
    },
    {
        id: 'answers',
        label: 'Answers',
        isChecked: false,
        icons: { left: <SoundMuteAlt />, right: <SoundMax /> },
    },
    {
        id: 'showTimer',
        label: 'Show Timer',
        isChecked: false,
        icons: { left: <SoundMuteAlt />, right: <SoundMax /> },
    },
    {
        id: 'vibrations',
        label: 'Vibrations',
        isChecked: false,
        icons: { left: <SoundMuteAlt />, right: <SoundMax /> },
    },
    {
        id: 'numpadTopRow',
        label: 'Numpad Top Row',
        isChecked: false,
        icons: { left: <Typography>789</Typography>, right: <Typography>123</Typography> },
    },
];
