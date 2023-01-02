import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { ThemeProvider } from '@material-ui/core/styles';
import Cropper from 'react-cropper';
import DragAndDrop from './DragAndDrop';
import theme from '../../theme';
import Box from '@material-ui/core/Box';
import {DialogTitle} from "@material-ui/core";

function CropperDialog({
                           okLabel = 'Edit',
                           cancelLabel = 'Cancel',
                           show,
                           dismiss,
                           cancel,
                           onCropped,
                           onSelected,
                           src,
                           isSquare,
                           aspectRatio,
                           setEdited,
                       }) {
    const [cropper, setCropper] = useState();
    const cropImage = () => {
        if (setEdited) {
            setEdited(true);
        }
        // console.log(typeof cropper);
        if (typeof cropper.getCroppedCanvas() === 'undefined' || !cropper.getCroppedCanvas()) {
            // console.log('hiii');
            return;
        }
        onCropped(cropper.getCroppedCanvas().toDataURL());
    };

    const handleDrop = (files) => {
        const reader = new FileReader();
        reader.onload = () => {
            onSelected(reader.result);
        };
        reader.readAsDataURL(files[0]);
    };

    CropperDialog.defaultProps = {
        okLabel: 'Edit',
        cancelLabel: 'Cancel',
        isSquare: 1,
        aspectRatio: 1,
    };

    return (
        <ThemeProvider theme={theme}>
            {/*theme={getTheme(themeColors.primary, themeColors.secondary)}*/}
            <Dialog fullWidth maxWidth="xs" onClose={dismiss} open={show}>
                <DialogTitle onClose={dismiss}>{'Upload Photo'}</DialogTitle>
                <DialogContent>
                    <Box width={'100%'}>
                        {!src ? (
                            <DragAndDrop handleDrop={handleDrop}>
                                <div style={{ height: 400, width: 400 }} />
                            </DragAndDrop>
                        ) : (
                            <Cropper
                                aspectRatio={isSquare ? 1 : aspectRatio ? aspectRatio : 12 / 16}
                                guides={true}
                                preview=".img-preview"
                                ref={(c) => {
                                    setCropper(c);
                                }}
                                onInitialized={(instance) => {
                                    setCropper(instance);
                                }}
                                src={src}
                                style={{ height: 400, width: '100%' }}
                            />
                        )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={cancel} style={{fontSize: '15px', fontWeight: '600', textTransform: 'none'}}>
                        {cancelLabel}
                    </Button>
                    {src ? (
                        <Button color="secondary" onClick={() => cropImage()} variant="contained" style={{fontSize: '15px', fontWeight: '600', textTransform: 'none'}}>
                            {okLabel}
                        </Button>
                    ) : (
                        <Button color="secondary" disabled variant="contained" style={{fontSize: '15px', fontWeight: '600', textTransform: 'none'}}>
                            {okLabel}
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    );
}

export default CropperDialog;