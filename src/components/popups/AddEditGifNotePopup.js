import { React, useState, forwardRef, useImperativeHandle } from 'react'
import { 
    Box,
    Modal,
    Typography,
    TextField,
    Button,
    FormControl,
    Select,
    MenuItem,
    InputLabel
} from '@mui/material';
import { postGifNote } from '../../services/gifyuApi';
import { putGifNote } from '../../services/gifyuApi';

const style = {
    root: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    },
    inputField: {
        width: "100%",
        marginTop: "10px",
        marginBottom: "10px"
    },
    buttons: {
        marginTop: "10px",
        marginLeft: "15px",
        float: "right",
        fontSize: "1rem"
    }
};

const AddGifNotePopup = forwardRef(({setSharedPopupState, mode}, ref) => {
    const [id, setId] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [gifUrl, setGifUrl] = useState("");
    const [open, setOpen] = useState(false);

    const categories = localStorage.getItem("categories").split(",");
    
    const handleOpen = (id, description, category, gifUrl) => {
        setId(id);
        setDescription(description);
        setCategory(category);
        setGifUrl(gifUrl);
        setOpen(true);
    }

    const handleClose = () => {
        setDescription("");
        setCategory("");
        setGifUrl("");
        setOpen(false);
    }
    
    const handleCategorySelection = (event) => {
        setCategory(event.target.value);
    };

    useImperativeHandle(ref, () => ({
        handleOpen,
    }));

    const addGifNote = () => {
        postGifNote(description, category.trim(), gifUrl).then(res => {
            setSharedPopupState({
                id: res.data._id,
                action: "ADD",
                status: "SUCCESS"
            });
        }).catch(err => {
            setSharedPopupState({
                error: err,
                action: "ADD",
                status: "FAILED"
            });
            console.log(err);
        })
        handleClose();
    }

    const updateGifNote = () => {
        putGifNote(id, description, category.trim(), gifUrl).then(res => {
            setSharedPopupState({
                id: res.data._id,
                action: "EDIT",
                status: "SUCCESS"
            });
        }).catch(err => {
            setSharedPopupState({
                error: err,
                action: "EDIT",
                status: "FAILED"
            });
            console.log(err);
        })
        handleClose();
    }

    const SubmitButton = () => {
        if (mode === "UPDATE") {
            return <Button onClick={updateGifNote} variant="contained" sx={style.buttons}>Update</Button>
        } else {
            return <Button onClick={addGifNote} variant="contained" sx={style.buttons}>Add</Button>
        }
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style.root}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Add GIF Note
                </Typography>
                <TextField
                    defaultValue={description}
                    onChange={(e) => setDescription(e.target.value)} 
                    value={description} 
                    label="Description" 
                    variant="standard"
                    autoComplete="off"
                    sx={style.inputField}>
                </TextField>
                <FormControl variant="standard" sx={{ width: "50%" }}>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                        defaultValue={category}
                        value={category}
                        label="Category"
                        onChange={handleCategorySelection}
                        renderValue={() => <em>{category}</em>}
                    >
                        {categories.map((categoryName, index) => {
                            return <MenuItem
                                        key={`${index}-${categoryName}`}
                                        value={categoryName}
                                    >
                                            {categoryName}
                                    </MenuItem>
                        })}
                    </Select>
                </FormControl>
                <TextField
                    defaultValue={gifUrl}
                    onChange={(e) => setGifUrl(e.target.value)} 
                    value={gifUrl} 
                    label="GIF URL" 
                    variant="standard"
                    autoComplete="off"
                    sx={style.inputField}>
                </TextField>
                <SubmitButton />
                <Button onClick={handleClose} sx={style.buttons}>Cancel</Button>
            </Box>
        </Modal>
    )
})

export default AddGifNotePopup;