import React from 'react';
import { confirmable } from 'react-confirm';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from './DialogTitle';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../../theme';
import Typography from '@material-ui/core/Typography';

const ConfirmDialog = ({
                           okLabel = 'OK',
                           cancelLabel = 'Cancel',
                           title,
                           confirmation,
                           show,
                           proceed,
                           dismiss,
                           cancel,
                           content,
                       }) => {
    return (
        <ThemeProvider theme={theme}>
            <Dialog fullWidth id="ln-confirm-dialog" maxWidth="xs" onClose={dismiss} open={show}>
                <DialogTitle onClose={dismiss}>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography color={'textPrimary'} variant="body2">{content}</Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={cancel}>
                        {cancelLabel}
                    </Button>
                    <Button color="primary" onClick={proceed}>
                        {okLabel}
                    </Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    );
};


export default confirmable(ConfirmDialog);
