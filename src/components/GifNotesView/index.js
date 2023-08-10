import { React, useEffect, useState, useRef } from 'react'
import { getGifNotes, getGifNotesByCategory } from '../../services/gifyuApi'
import GifNoteTile from './GifNoteTile'
import { Container, Grid, Typography, Box } from '@mui/material'
import AddEditGifNotePopup from '../popups/AddEditGifNotePopup'
import Snackbar from './Snackbar'

const styles = {
    categoryDisplay: {
        fontSize: "2rem",
        marginBottom: "30px"
    }
}

const GifNoteView = ({ sharedPopupState, setSharedPopupState, sharedCategoryState, sharedDrawerState }) => {
    const [gifNotes, setGifNotes] = useState([]);
    const popupRef = useRef();

    const openPopup = (id, description, category, gifUrl) => {
        if (popupRef.current) {
            popupRef.current.handleOpen(id, description, category, gifUrl);
        }
    };

    const fetchAllGifNotes = () => {
        getGifNotes()
        .then(res => setGifNotes(res.data))
        .catch(err => console.log(err));
    };

    const fetchGifNotesByCategory = () => {
        getGifNotesByCategory(sharedCategoryState)
        .then(res => setGifNotes(res.data))
        .catch(err => console.log(err));
    };

    useEffect(() => {
        if (sharedCategoryState === "") {
            fetchAllGifNotes();
        } else {
            fetchGifNotesByCategory();
        }
    }, [sharedPopupState, sharedCategoryState, sharedDrawerState])

    const GifNotesGrid = () => {
        return (
            <Grid container spacing={2}>
                {gifNotes.map(gifNote => (
                    <Grid key={gifNote._id} item xs={12} sm={6} md={4} lg={3}>
                        <GifNoteTile
                            key={gifNote._id}
                            id={gifNote._id}
                            note={gifNote.note} 
                            category={gifNote.category}
                            gifUrl={gifNote.gifUrl}
                            setSharedPopupState={setSharedPopupState}
                            openPopup={openPopup}
                        />
                    </Grid>
                ))}
            </Grid>
        )
    };

    const NoGifNotesMessage = () => {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="50vh"
            >
                <Typography sx={{ fontSize: "1.2rem" }}>No notes in this category</Typography>
            </Box>
        )
    };

    const CategoryDisplay = () => {
        return (
            <Box sx={{ display: "flex" }}>
                <Typography sx={styles.categoryDisplay}>Category:</Typography>
                <Typography sx={{ ...styles.categoryDisplay, marginLeft: "15px" }}>
                    {sharedCategoryState === "" ? "All" : sharedCategoryState}
                </Typography>
            </Box>
        )
    };

    return (
        <Container style={{ maxWidth: "100rem", marginTop: "30px" }}>
            <Snackbar sharedPopupState={sharedPopupState}/>
            <AddEditGifNotePopup ref={popupRef} setSharedPopupState={setSharedPopupState} mode={"UPDATE"}/>
            <CategoryDisplay />
            { gifNotes.length > 0 ?
                <GifNotesGrid /> :
                <NoGifNotesMessage />
            }
        </Container>
    )
}

export default GifNoteView;