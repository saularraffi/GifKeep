import { React, useEffect, useState, useRef } from 'react'
import { getGifNotes } from '../../services/gifyuApi'
import GifNoteTile from './GifNoteTile'
import { Container, Grid, Alert } from '@mui/material'
import AddGifNotePopup from '../TopAppBar/AddGifNotePopup'

const styles = {
    alert: {
        marginBottom: "30px",
        width: "30%"
    }
}

const GifNoteView = ({ sharedState, setSharedState }) => {
    const [gifNotes, setGifNotes] = useState([]);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const popupRef = useRef();

    const openPopup = (id, description, category, gifUrl) => {
        if (popupRef.current) {
            popupRef.current.handleOpen(id, description, category, gifUrl);
        }
    };

    useEffect(() => {
        if (sharedState != null) {
            if (sharedState.status === "SUCCESS") {
                setShowErrorAlert(false);
                setShowSuccessAlert(true);
            } else {
                setShowErrorAlert(true);
                setShowSuccessAlert(false);
            }
        }
        getGifNotes().then(res => {
            setGifNotes(res.data);
        });
    }, [sharedState])

    const AlertMessage = () => {
        const successfulAdd = <Alert severity="success" sx={styles.alert}><strong>Successfully</strong> added GIF Note</Alert>;
        const failedAdd = <Alert severity="error" sx={styles.alert}><strong>Failed</strong> to add GIF Note!</Alert>
        const successfulDelete = <Alert severity="success" sx={styles.alert}><strong>Successfully</strong> deleted GIF Note</Alert>;
        const failedDelete = <Alert severity="error" sx={styles.alert}><strong>Failed</strong> to delete GIF Note!</Alert>
        const successfulUpdate = <Alert severity="success" sx={styles.alert}><strong>Successfully</strong> updated GIF Note</Alert>;
        const failedUpdate = <Alert severity="error" sx={styles.alert}><strong>Failed</strong> to updated GIF Note!</Alert>

        if (showSuccessAlert) {
            if (sharedState.action === "ADD") {
                return successfulAdd;
            } else if (sharedState.action === "DELETE") {
                return successfulDelete;
            } else {
                return successfulUpdate;
            }
        } else if (showErrorAlert) {
            if (sharedState.action === "ADD") {
                return failedAdd;
            } else if (sharedState.action === "DELETE") {
                return failedDelete;
            } else {
                return failedUpdate;
            }
        }
    }

    const updateSharedState = (data) => {
        setSharedState(data);
    }

    return (
        <Container style={{maxWidth: "100rem"}}>
            <AlertMessage />
            <AddGifNotePopup ref={popupRef} updateSharedState={updateSharedState} mode={"UPDATE"}/>
            <Grid container spacing={2}>
                {gifNotes.map(gifNote => (
                    <Grid key={gifNote._id} item xs={12} sm={6} md={4} lg={3}>
                        <GifNoteTile
                            key={gifNote._id}
                            id={gifNote._id}
                            note={gifNote.note} 
                            category={gifNote.category}
                            gifUrl={gifNote.gifUrl}
                            setSharedState={setSharedState}
                            openPopup={openPopup}
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default GifNoteView;