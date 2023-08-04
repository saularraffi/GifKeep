import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TextField from '@mui/material/TextField';
import theme from '../../theme';
import { putUser } from '../../services/usersApi';

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
    const [categories, setCategories] = React.useState(localStorage.getItem("categories").split(","));
    const [newCategory, setNewCategory] = React.useState("");
    const [inAddCategoryMode, setInAddCategoryMode] = React.useState(false);
    const anchor = "left";

    const addCategory = () => {
        const userId = localStorage.getItem("userId");
        const username = localStorage.getItem("username");
        
        if (newCategory != "") {
            categories.push(newCategory);

            putUser(userId, username, categories).then(res => res.data)
            .then(user => {
                localStorage.setItem("categories", user.categories);
                setCategories(user.categories);
                setInAddCategoryMode(false);
            })
            .catch(err => console.log(err));
        }
    };

    const toggleDrawer = (isOpen) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
    
        setOpen(isOpen);
        setInAddCategoryMode(false);
        setNewCategory("");
    };

    const handleCategoryOptionClick = (index) => {
        alert(index)
    };

    const handleAddButtonHighlight = (hover) => {
        const color = hover ? theme.palette.primary.main : lightGrey;
        setAddCategoryButtonColor(color);
    };

    const handleAddCategoryBtnClicked = () => {
        setInAddCategoryMode(true);
    };

    const handleAddCategory = (event) => {
        if (event.key === 'Enter') {
            addCategory();
        }
    };

    const AddCategoryButton = () => {
        if (!inAddCategoryMode) {
            return (
                <Box sx={{ marginLeft: "30px" }} 
                    onMouseEnter={() => handleAddButtonHighlight(true)}
                    onMouseLeave={() => handleAddButtonHighlight(false)}
                >
                    <Grid container>
                        <Grid item sx={styles.dividerContainer}>
                            <Divider color={addCategoryButtonColor} sx={styles.divider} />
                        </Grid>
                        <Grid item sx={{ margin: 0, padding: 0 }}>
                            <IconButton
                                onClick={handleAddCategoryBtnClicked}
                                sx={{fontSize: "1rem", padding: 0}}
                            >
                                <AddBoxIcon sx={{ fontSize: "1.7em", color: addCategoryButtonColor }}/>
                            </IconButton>
                        </Grid>
                        <Grid item sx={styles.dividerContainer}>
                            <Divider color={addCategoryButtonColor} sx={styles.divider} />
                        </Grid>
                    </Grid>
                </Box>
            )
        }
    };

    const CategoryRow = (props) => {
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
    };

    const drawerItems = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
        >
            <Typography sx={{ margin: "20px 0 10px 10px", fontSize: "1.5rem" }}>Categories</Typography>
            <Divider color={lightGrey}/>
            <List>
                {categories.map((text, index) => (
                    <CategoryRow text={text} index={index} />
                ))}
            </List>
            {inAddCategoryMode && 
                <TextField
                    onChange={(e) => setNewCategory(e.target.value)}
                    onKeyDown={handleAddCategory}
                    id="outlined-basic"
                    label="Category Name..."
                    variant="filled"
                    sx={{ marginLeft: "10px" }}
                />
            }
            <AddCategoryButton />
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