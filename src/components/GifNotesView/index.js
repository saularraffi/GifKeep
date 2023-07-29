import { React, useEffect, useState } from 'react'
import { getGifNotes } from '../../services/gifyuApi'
import GifNoteTile from './GifNoteTile'
import { Box, Grid } from '@material-ui/core'


const GifNoteView = () => {
    const [gifNotes, setGifNotes] = useState([]);

    useEffect(() => {
        getGifNotes().then(data => {
            setGifNotes(data);
        });
    }, [])

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                {gifNotes.map((gifNote) => { 
                    return (
                        <Grid item xs={8}>
                            <GifNoteTile
                                key={gifNote._id}
                                note={gifNote.note} 
                                category={gifNote.category} 
                                gifUrl={gifNote.gifUrl}
                            />
                        </Grid>
                    )
                })}
            </Grid>
        </Box>
    )
}

export default GifNoteView;