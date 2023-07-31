import { React, useEffect, useState } from 'react'
import { getGifNotes } from '../../services/gifyuApi'
import GifNoteTile from './GifNoteTile'
import { Container, Grid } from '@mui/material'


const GifNoteView = ({ sharedState }) => {
    const [gifNotes, setGifNotes] = useState([]);

    useEffect(() => {
        getGifNotes().then(res => {
            setGifNotes(res.data);
        });
    }, [sharedState])

    return (
        <Container style={{maxWidth: "100rem"}}>
            <Grid container spacing={2}>
                {gifNotes.map(gifNote => (
                    <Grid key={gifNote._id} item xs={12} sm={6} md={4} lg={3}>
                        <GifNoteTile
                            key={gifNote._id}
                            note={gifNote.note} 
                            gifUrl={gifNote.gifUrl}
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default GifNoteView;