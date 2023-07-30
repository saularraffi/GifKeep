import { React, useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Typography } from '@mui/material';

const TopAppBar = () => {
    useEffect(() => {
        
    }, [])

    return (
        <Box sx={{ flexGrow: 1, marginBottom: "50px" }}>
            <AppBar position="static" sx={{ backgroundColor: "#3a3e4d" }}>
                <Toolbar>
                    <Typography sx={{ fontFamily: "Bree Serif", fontSize: "2rem" }}>GifKeep</Typography>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2, marginLeft: "auto" }}
                    >
                        <AddBoxIcon sx={{ fontSize: "2.5rem" }} />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default TopAppBar;