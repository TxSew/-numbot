import { Box, Button, Dialog, DialogActions, DialogTitle, Stack } from '@mui/material';
import { ReactNode } from 'react';
import { IPopUp } from '../../hooks/usePopUp';
import { borderPopupSettingStyles, customScrollBox } from '../game-appbar/configs';

type PopupBaseComponentProps = IPopUp & {
    title: ReactNode;
    dialogTitle?: ReactNode;
    descContent: ReactNode;
    buttonConfirm?: ReactNode;
    buttonCancel?: ReactNode;
    isHideBorder?: ReactNode;
};

export default function PopupBaseComponent(props: PopupBaseComponentProps) {
    const { dialogTitle, open, title, descContent, onClose, onConfirm, buttonConfirm, buttonCancel, isHideBorder } =
        props;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    margin: '0px',
                    overflowY: 'hidden',
                    borderRadius: '32px !important',
                    boxShadow: 'none',
                    backgroundColor: 'transparent',
                },
            }}
        >
            {dialogTitle && (
                <DialogTitle component={Stack} sx={{ textAlign: 'center' }}>
                    {dialogTitle}
                </DialogTitle>
            )}

            <Box
                sx={{
                    minWidth: { xs: 300, sm: 400 },
                    minHeight: { xs: 580, sm: 710 },
                    borderRadius: 20,
                    backgroundColor: '#36545d',
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    padding: { xs: 2, sm: 0 },
                }}
            >
                {borderPopupSettingStyles.map((border) => (
                    <Box key={border.id} sx={border.sx} />
                ))}
                {title}
                {!isHideBorder && (
                    <Box
                        borderTop={'1px solid #1c2d33'}
                        boxShadow={'inset 0 1px 0 0 rgba(177,194,197,.41)'}
                        position={'absolute'}
                        width={'80%'}
                        left={'10%'}
                        zIndex={10}
                        top={100}
                    />
                )}

                <Box
                    sx={{
                        position: 'absolute',
                        top: dialogTitle ? 110 : { xs: 230, sm: 190 },
                        bottom: 20,
                        padding: 2,
                        width: '90%',
                        margin: '0 auto',
                        overflowY: 'auto',
                        backgroundColor: 'transparent',
                        borderRadius: '8px',
                        ...customScrollBox,
                    }}
                >
                    <Stack direction={'column'} margin={'0 auto'} spacing={2} alignItems={'center'}>
                        {descContent}
                    </Stack>
                </Box>
            </Box>

            {buttonCancel && buttonConfirm && (
                <Stack direction={'row'} mt={4} justifyContent={'center'}>
                    <DialogActions>
                        <Button
                            disableRipple
                            onClick={onClose}
                            sx={{
                                padding: '0px 16px',
                                marginTop: '-24px',
                                ':hover': {
                                    bgcolor: 'transparent',
                                },
                            }}
                        >
                            {buttonCancel}
                        </Button>
                        <Button
                            disableRipple
                            onClick={onConfirm}
                            sx={{
                                padding: '0px 16px',
                                marginTop: '-24px',
                                ':hover': {
                                    bgcolor: 'transparent',
                                },
                            }}
                        >
                            {buttonConfirm}
                        </Button>
                    </DialogActions>
                </Stack>
            )}
        </Dialog>
    );
}
