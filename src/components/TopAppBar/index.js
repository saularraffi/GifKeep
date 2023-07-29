import { React, useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';

const TopAppBar = () => {
    useEffect(() => {
        
    }, [])

    return (
        <Box sx={{ flexGrow: 1, marginBottom: "50px" }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2, marginLeft: "auto" }}
                    >
                        <AddBoxIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default TopAppBar;