import { React, useEffect, useState } from 'react'
import { getGifNotes } from '../../services/gifyuApi'
import GifNoteTile from './GifNoteTile'
import { Container, Grid, Alert } from '@mui/material'

const styles = {
    alert: {
        marginBottom: "30px",
        width: "30%"
    }
}

const GifNoteView = ({ sharedState }) => {
    const [gifNotes, setGifNotes] = useState([]);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    useEffect(() => {
        if (sharedState != null) {
            if (sharedState.constructor.name === "AxiosError") {
                setShowErrorAlert(true);
                setShowSuccessAlert(false);
            } else {
                setShowErrorAlert(false);
                setShowSuccessAlert(true);
            }
        }
        getGifNotes().then(res => {
            setGifNotes(res.data);
        });
    }, [sharedState])

    const AlertMessage = () => {
        if (showSuccessAlert) {
            return <Alert severity="success" sx={styles.alert}><strong>Successfully</strong> added GIF Note</Alert>
        } else if (showErrorAlert) {
            return <Alert severity="error" sx={styles.alert}><strong>Failed</strong> to add GIF Note!</Alert>
        }
    }

    return (
        <Container style={{maxWidth: "100rem"}}>
            <AlertMessage />
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