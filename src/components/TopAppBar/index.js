import { React, useRef } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Typography } from "@mui/material";
import AddEditGifNotePopup from "../popups/AddEditGifNotePopup";
import MenuIcon from "@mui/icons-material/Menu";

const TopAppBar = ({ setSharedPopupState, openDrawer }) => {
    const popupRef = useRef();

    const openPopup = () => {
        if (popupRef.current) {
            popupRef.current.handleOpen();
        }
    };

    const handleMenuClick = () => {
        openDrawer(true);
    };

    const CustomToolbar = () => {
        return (
            <Toolbar>
                <IconButton size="large" onClick={handleMenuClick}>
                    <MenuIcon sx={{ fontSize: "2.5rem", color: "white" }} />
                </IconButton>
                <Typography sx={{ marginLeft: "15px", fontSize: "2rem" }}>
                    GifKeep
                </Typography>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    onClick={openPopup}
                    sx={{ mr: 2, marginLeft: "auto" }}
                >
                    <AddBoxIcon sx={{ fontSize: "2.5rem" }} />
                </IconButton>
            </Toolbar>
        );
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AddEditGifNotePopup
                ref={popupRef}
                setSharedPopupState={setSharedPopupState}
                mode={"ADD"}
            />
            <AppBar position="static">
                <CustomToolbar />
            </AppBar>
        </Box>
    );
};

export default TopAppBar;
