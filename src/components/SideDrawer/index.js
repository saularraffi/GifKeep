import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Typography, Grid } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import theme from '../../theme';

const styles = {
    dividerContainer: {
        display: "flex",
        alignItems: "center",
        width: "35%"
    },
    divider: {
        width: "100%",
        borderBottomWidth: "2px"
    }
}

export default function SideDrawer({ open, setOpen }) {
    const lightGrey = "#c7c7c7"
    const [addCategoryButtonColor, setAddCategoryButtonColor] = React.useState(lightGrey)
    const anchor = "left";
    const categories = localStorage.getItem("categories").split(",");

    React.useEffect(() => {

    }, [])

    const toggleDrawer = (isOpen) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
    
        setOpen(isOpen);
    };

    const handleCategoryOptionsClick = (index) => {
        alert(index)
    }

    const handleAddButtonHighlight = (hover) => {
        const color = hover ? theme.palette.primary.main : lightGrey;
        setAddCategoryButtonColor(color);
    }

    const drawerItems = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <Typography sx={{ margin: "20px 0 10px 10px", fontSize: "1.5rem" }}>Categories</Typography>
            <Divider color={lightGrey}/>
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
            <Box sx={{ marginLeft: "30px" }} 
                onMouseEnter={() => handleAddButtonHighlight(true)}
                onMouseLeave={() => handleAddButtonHighlight(false)}
            >
                <Grid container>
                    <Grid item sx={styles.dividerContainer}>
                        <Divider color={addCategoryButtonColor} sx={styles.divider} />
                    </Grid>
                    <Grid item sx={{ margin: 0, padding: 0 }}>
                        <AddBoxIcon sx={{ fontSize: "1.7em", color: addCategoryButtonColor }}/>
                    </Grid>
                    <Grid item sx={styles.dividerContainer}>
                        <Divider color={addCategoryButtonColor} sx={styles.divider} />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );

    return (
        <div>
            <Drawer
                anchor={anchor}
                open={open}
                onClose={toggleDrawer(false)}
            >
                {drawerItems()}
            </Drawer>
        </div>
    )
}