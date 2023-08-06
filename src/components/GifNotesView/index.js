import { React, useEffect, useState, useRef } from 'react'
import { getGifNotes } from '../../services/gifyuApi'
import GifNoteTile from './GifNoteTile'
import { Container, Grid, Alert } from '@mui/material'
import AddEditGifNotePopup from '../popups/AddEditGifNotePopup'
import Snackbar from './Snackbar'

const GifNoteView = ({ sharedPopupState, setSharedPopupState }) => {
    const [gifNotes, setGifNotes] = useState([]);
    const popupRef = useRef();

    const openPopup = (id, description, category, gifUrl) => {
        if (popupRef.current) {
            popupRef.current.handleOpen(id, description, category, gifUrl);
        }
    };

    useEffect(() => {
        getGifNotes().then(res => {
            setGifNotes(res.data);
        }).catch(err => {
            console.log(err);
        });
    }, [sharedPopupState])

    return (
        <Container style={{ maxWidth: "100rem", marginTop: "50px" }}>
            <Snackbar sharedPopupState={sharedPopupState}/>
            <AddEditGifNotePopup ref={popupRef} setSharedPopupState={setSharedPopupState} mode={"UPDATE"}/>
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
        </Container>
    )
}

export default GifNoteView;