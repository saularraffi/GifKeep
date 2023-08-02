import { React, useState } from 'react'
import { Container, Typography, Paper, IconButton, Box, Grid } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { deleteGifNote } from '../../services/gifyuApi';

const styles = {
    root: {
        backgroundColor: "white",
        border: "1px solid rgba(0, 0, 0, 0.12)"
    },
    typography: {
        fontSize: "20px",
        paddingTop: "5px",
        paddingBottom: "10px"
    }
}

const GifNoteTile = ({id, note, category, gifUrl, setSharedState, openPopup}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        deleteGifNote(id).then(res => {
            setSharedState({
                id: res,
                action: "DELETE",
                status: "SUCCESS"
            });
        }).catch(err => {
            setSharedState({
                error: err,
                action: "DELETE",
                status: "FAILED"
            });
            console.log(err)
        });
        handleClose();
    };

    const handleEdit = () => {
        openPopup(id, note, category, gifUrl);
    };

    const MenuOptions = () => {
        return (
            <>
                <MenuItem onClick={handleDelete}>
                    <Typography sx={{ fontFamily: "Kanit", color: "red" }}>DELETE</Typography>
                </MenuItem>
                <MenuItem onClick={handleEdit}>
                    <Typography sx={{ fontFamily: "Kanit", color: "blue" }}>EDIT</Typography>
                </MenuItem>  
            </>
        )
    };

    return (
        <Paper style={styles.root} elevation={2}>
            <Box sx={{ float: "right" }}>
                <IconButton onClick={handleClick}>
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuOptions />
                </Menu>
            </Box>
            <img src={gifUrl} alt="" style={{ width: "100%" }}/>
            <Container>
                <Typography style={styles.typography}>{note}</Typography>
            </Container>
        </Paper>
    )
}

export default GifNoteTile;