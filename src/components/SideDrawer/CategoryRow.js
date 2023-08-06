import * as React from 'react';
import {
    ListItem, 
    ListItemButton,
    ListItemText,
    ListItemIcon,
    IconButton
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function CategoryRow(props) {

    const handleCategoryOptionClick = (index) => {
        alert(index)
    };

    return (
        <ListItem key={props.text} disablePadding>
            <ListItemButton sx={{ paddingRight: 0 }}>
                <ListItemText primary={props.text} />
                <ListItemIcon sx={{ minWidth: 0 }}>
                    <IconButton onClick={() => handleCategoryOptionClick(props.index)}>
                        <MoreVertIcon />
                    </IconButton>
                </ListItemIcon>
            </ListItemButton>
        </ListItem>
    )
}