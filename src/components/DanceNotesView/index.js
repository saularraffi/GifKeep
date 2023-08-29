import { React, useEffect, useState, useRef } from "react";
import {
    getDanceNotes,
    getDanceNotesByCategory,
} from "../../services/danceNotesApi";
import DanceNoteTile from "./DanceNoteTile";
import { Container, Grid, Typography, Box } from "@mui/material";
import AddEditDanceNotePopup from "../popups/AddEditDanceNotePopup";
import Snackbar from "./Snackbar";

const styles = {
    categoryDisplay: {
        fontSize: "2rem",
        marginBottom: "30px",
    },
};

const DanceNoteView = ({
    sharedPopupState,
    setSharedPopupState,
    sharedCategoryState,
    sharedDrawerState,
}) => {
    const [danceNotes, setDanceNotes] = useState([]);
    const popupRef = useRef();

    const openPopup = (id, noteText, category, videoUrl) => {
        if (popupRef.current) {
            popupRef.current.handleOpen(id, noteText, category, videoUrl);
        }
    };

    const fetchAllDanceNotes = () => {
        getDanceNotes()
            .then((res) => setDanceNotes(res.data))
            .catch((err) => console.log(err));
    };

    const fetchDanceNotesByCategory = () => {
        getDanceNotesByCategory(sharedCategoryState)
            .then((res) => setDanceNotes(res.data))
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        if (sharedCategoryState === "") {
            fetchAllDanceNotes();
        } else {
            fetchDanceNotesByCategory();
        }
    }, [sharedPopupState, sharedCategoryState, sharedDrawerState]);

    const DanceNotesGrid = () => {
        return (
            <Grid container spacing={2}>
                {danceNotes.map((danceNote) => (
                    <Grid key={danceNote._id} item xs={12} sm={6} md={4} lg={3}>
                        <DanceNoteTile
                            key={danceNote._id}
                            id={danceNote._id}
                            note={danceNote.note}
                            category={danceNote.category}
                            videoUrl={danceNote.videoUrl}
                            setSharedPopupState={setSharedPopupState}
                            openPopup={openPopup}
                        />
                    </Grid>
                ))}
            </Grid>
        );
    };

    const NoDanceNotesMessage = () => {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="50vh"
            >
                <Typography sx={{ fontSize: "1.2rem" }}>
                    No notes in this category
                </Typography>
            </Box>
        );
    };

    const CategoryDisplay = () => {
        return (
            <Box sx={{ display: "flex" }}>
                <Typography sx={styles.categoryDisplay}>Category:</Typography>
                <Typography
                    sx={{ ...styles.categoryDisplay, marginLeft: "15px" }}
                >
                    {sharedCategoryState === "" ? "All" : sharedCategoryState}
                </Typography>
            </Box>
        );
    };

    return (
        <Container
            style={{
                maxWidth: "100rem",
                marginTop: "30px",
            }}
        >
            <Snackbar sharedPopupState={sharedPopupState} />
            <AddEditDanceNotePopup
                ref={popupRef}
                setSharedPopupState={setSharedPopupState}
                mode={"UPDATE"}
            />
            <CategoryDisplay />
            {danceNotes.length > 0 ? (
                <DanceNotesGrid />
            ) : (
                <NoDanceNotesMessage />
            )}
        </Container>
    );
};

export default DanceNoteView;
