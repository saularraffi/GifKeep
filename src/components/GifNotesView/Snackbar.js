import * as React from 'react';
import { Stack, Box } from '@mui/material';
import { default as MuiSnackbar } from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Snackbar({ sharedPopupState }) {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        if (sharedPopupState != null) {
            setOpen(true);
        }
    }, [sharedPopupState])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const FormattedAlert = () => {
        const severity = sharedPopupState.status === "SUCCESS" ? "success" : "error";
        const action = sharedPopupState.action.toLowerCase();
        const message = {
            success: {
                add: "Successfully added GIF Note",
                delete: "Successfully deleted GIF Note",
                edit: "Successfully edited GIF Note",
            },
            error: {
                get: "Failed to get GIF Notes!",
                add: "Failed to add GIF Note!",
                delete: "Failed to delete GIF Note!",
                edit: "Failed to edit GIF Note!"
            }
        }
        return (
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {message[severity][action]}
            </Alert>
        )
    };

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <MuiSnackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Box>
                    <FormattedAlert />
                </Box>
            </MuiSnackbar>
        </Stack>
    );
}