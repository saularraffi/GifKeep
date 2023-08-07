import * as React from 'react';
import {
    ListItem, 
    ListItemButton,
    ListItemText,
    ListItemIcon,
    IconButton,
    Menu,
    MenuItem,
    Typography
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { putUser } from '../../services/usersApi';

export default function CategoryRow(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleCategoryOptionClick = (event, index) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        const userId = localStorage.getItem("userId");
        const username = localStorage.getItem("username");
        const categories = localStorage.getItem("categories").split(",");
        categories.splice(props.index, 1);

        putUser(userId, username, categories).then(res => res.data)
        .then(user => props.setUserCategories(user.categories))
        .catch(err => console.log(err));
    };

    const handleEditMode = () => {
        props.setEditState({ inEditMode: true, index: props.index })
    };

    const MenuOptions = () => {
        return (
            <>
                <MenuItem onClick={handleEditMode}>
                    <Typography sx={{ fontFamily: "Kanit", color: "blue" }}>EDIT</Typography>
                </MenuItem>  
                <MenuItem onClick={handleDelete}>
                    <Typography sx={{ fontFamily: "Kanit", color: "red" }}>DELETE</Typography>
                </MenuItem>
            </>
        )
    };

    const handleCategorySelected = () => {
        props.handleCategorySelected(props.index);
    };

    return (
        <ListItem key={props.text} disablePadding>
            <ListItemButton onClick={handleCategorySelected} sx={{ paddingRight: 0 }}>
                <ListItemText primary={props.text} />
                <ListItemIcon sx={{ minWidth: 0 }}>
                    <IconButton onClick={(event) => handleCategoryOptionClick(event, props.index)}>
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
                </ListItemIcon>
            </ListItemButton>
        </ListItem>
    )
}