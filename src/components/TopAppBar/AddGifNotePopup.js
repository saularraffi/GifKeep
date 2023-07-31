import { React, useState, forwardRef, useImperativeHandle } from 'react'
import { Box, Modal, Typography, TextField, Button  } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const AddGifNotePopup = forwardRef((props, ref) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useImperativeHandle(ref, () => ({
        handleOpen,
    }));

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Add GIF Note
                </Typography>
                <TextField label="Description" variant="standard"></TextField>
                <TextField label="Category" variant="standard"></TextField>
                <TextField label="GIF URL" variant="standard"></TextField>
                <Button variant="contained">Add</Button>
            </Box>
        </Modal>
    )
})

export default AddGifNotePopup;