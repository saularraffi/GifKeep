import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';

const categories = [
    "Turn Patterns",
    "Hand Play",
    "Sensual",
    "Other"
]

export default function SideDrawer({ open, setOpen }) {
    const anchor = "left";

    const toggleDrawer = (isOpen) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
    
        setOpen(isOpen);
    };

    const handleCategoryOptionsClick = (index) => {
        alert(index)
    }

    const drawerItems = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <Typography sx={{ margin: "20px 0 10px 10px", fontSize: "1.5rem" }}>Categories</Typography>
            <Divider />
            <List>
                {categories.map((text, index) => (
                <ListItem key={text} disablePadding>
                    <ListItemButton sx={{ paddingRight: 0 }}>
                        <ListItemText primary={text} />
                        <ListItemIcon sx={{ minWidth: 0 }}>
                            <IconButton onClick={() => handleCategoryOptionsClick(index)}>
                                <MoreVertIcon />
                            </IconButton>
                        </ListItemIcon>
                    </ListItemButton>
                </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div>
            <Drawer
                anchor={anchor}
                open={open}
                onClose={toggleDrawer(false)}
                // hideBackdrop={true}
                // variant={"permanent"}
            >
                {drawerItems()}
            </Drawer>
        </div>
    )
}