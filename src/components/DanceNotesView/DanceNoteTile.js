import { React, useState } from "react";
import { Container, Typography, Paper, IconButton, Box } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { deleteDanceNote } from "../../services/danceNotesApi";

const styles = {
    root: {
        backgroundColor: "white",
        border: "1px solid rgba(0, 0, 0, 0.12)",
    },
    typography: {
        fontSize: "20px",
        paddingTop: "5px",
        paddingBottom: "10px",
    },
};

const DanceNoteTile = ({
    id,
    note,
    category,
    videoUrl,
    setSharedPopupState,
    openPopup,
}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [videoIsPlaying, setVideoIsPlaying] = useState(false);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        deleteDanceNote(id)
            .then((res) => {
                setSharedPopupState({
                    id: res,
                    action: "DELETE",
                    status: "SUCCESS",
                });
            })
            .catch((err) => {
                setSharedPopupState({
                    error: err,
                    action: "DELETE",
                    status: "FAILED",
                });
                console.log(err);
            });
        handleClose();
    };

    const handleEdit = () => {
        openPopup(id, note, category, videoUrl);
    };

    const MenuOptions = () => {
        return (
            <>
                <MenuItem onClick={handleEdit}>
                    <Typography sx={{ fontFamily: "Kanit" }}>EDIT</Typography>
                </MenuItem>
                <MenuItem onClick={handleDelete}>
                    <Typography sx={{ fontFamily: "Kanit", color: "red" }}>
                        DELETE
                    </Typography>
                </MenuItem>
            </>
        );
    };

    const playVideo = () => {
        setVideoIsPlaying(true);
    };

    return (
        <Paper style={styles.root} elevation={2}>
            <Box sx={{ float: "right" }}>
                <IconButton onClick={handleClick}>
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        "aria-labelledby": "basic-button",
                    }}
                >
                    <MenuOptions />
                </Menu>
            </Box>

            <Box>
                {videoIsPlaying ? (
                    <video
                        controls
                        style={{ width: "100%", height: "100%" }}
                        src={`http://localhost:8080/api/videos/${id}`}
                        autoPlay
                    ></video>
                ) : (
                    <img
                        style={{ width: "100%", height: "100%" }}
                        src="http://localhost:8080/api/videos/thumbnail/placeholder"
                        alt="placeholder"
                        onClick={playVideo}
                    />
                )}
            </Box>

            <Container>
                <Typography style={note ? styles.typography : {}}>
                    {note}
                </Typography>
            </Container>
        </Paper>
    );
};

export default DanceNoteTile;
