import { React, useRef } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {
    Typography,
    Tooltip,
    Box,
    AppBar,
    Toolbar,
    IconButton,
} from "@mui/material";
import AddEditDanceNotePopup from "../popups/AddEditDanceNotePopup";
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
                    MyBaile
                </Typography>
                <Tooltip title="Add New Note">
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        onClick={openPopup}
                        sx={{ mr: 2, marginLeft: "auto" }}
                    >
                        <AddBoxIcon sx={{ fontSize: "2.5rem" }} />
                    </IconButton>
                </Tooltip>
            </Toolbar>
        );
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AddEditDanceNotePopup
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
