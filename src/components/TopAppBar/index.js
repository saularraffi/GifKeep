import { React, useRef } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Typography } from '@mui/material';
import AddGifNotePopup from './AddGifNotePopup';

const TopAppBar = ({ onStateChange }) => {
    const popupRef = useRef();

    const openPopup = () => {
        if (popupRef.current) {
            popupRef.current.handleOpen("", "", "");
        }
    };

    const updateSharedState = (data) => {
        onStateChange(data);
    };

    const CustomToolbar = () => {
        return (
            <Toolbar>
                <Typography sx={{ fontSize: "2rem" }}>GifKeep</Typography>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={openPopup}
                    sx={{ mr: 2, marginLeft: "auto" }}
                >
                    <AddBoxIcon sx={{ fontSize: "2.5rem" }} />
                </IconButton>
            </Toolbar>
        )
    }

    return (
        <Box sx={{ flexGrow: 1, marginBottom: "50px" }}>
            <AddGifNotePopup ref={popupRef} updateSharedState={updateSharedState}/>
            <AppBar position="static">
                <CustomToolbar />
            </AppBar>
        </Box>
    )
}

export default TopAppBar;