import { Fragment, React, useState } from "react";
import {
    Container,
    Typography,
    Paper,
    IconButton,
    Box,
    Tooltip,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { deleteDanceNote } from "../../services/danceNotesApi";
import { deleteVideo } from "../../services/videoApi";

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

const loadingImg =
    "https://media0.giphy.com/media/9dsa6FX5zpQO5lGEhx/giphy.gif?cid=ecf05e47zhp1iyssits4vs3mw3ze6k3crw260sud84zj1hub&ep=v1_gifs_search&rid=giphy.gif";

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
    const [showNoteText, setShowNoteText] = useState(false);
    const openOptions = Boolean(anchorEl);

    const handleOptionsClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleOptionsClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        deleteDanceNote(id)
            .then((res) => {
                deleteVideo(id)
                    .then((res) => console.log(res))
                    .catch((err) => console.log(err));

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
        handleOptionsClose();
    };

    const handleEdit = () => {
        openPopup(id, note, category, videoUrl);
    };

    const playVideo = () => {
        setVideoIsPlaying(true);
    };

    const handleNoteTextVisibilityClick = () => {
        setShowNoteText(!showNoteText);
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

    return (
        <Paper style={styles.root} elevation={2}>
            <Box sx={{ float: "right" }}>
                <Tooltip title={showNoteText ? "Hide Note" : "Show Note"}>
                    <IconButton
                        disabled={!note}
                        onClick={handleNoteTextVisibilityClick}
                    >
                        <VisibilityIcon />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Options">
                    <IconButton onClick={handleOptionsClick}>
                        <MoreVertIcon />
                    </IconButton>
                </Tooltip>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={openOptions}
                    onClose={handleOptionsClose}
                    MenuListProps={{
                        "aria-labelledby": "basic-button",
                    }}
                >
                    <MenuOptions />
                </Menu>
            </Box>

            <Box sx={{ backgroundColor: "black", marginTop: "40px" }}>
                {videoIsPlaying ? (
                    <video
                        controls
                        style={{ width: "100%", height: "215px" }}
                        src={`http://localhost:8080/api/videos/${id}`}
                        autoPlay
                    ></video>
                ) : (
                    <img
                        style={{ width: "100%", height: "215px" }}
                        src={`http://localhost:8080/api/videos/thumbnail/${id}`}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = loadingImg;
                        }}
                        alt="placeholder"
                        onClick={playVideo}
                    />
                )}
            </Box>

            {showNoteText ? (
                <Container>
                    <Typography style={note ? styles.typography : {}}>
                        {note}
                    </Typography>
                </Container>
            ) : (
                <></>
            )}
        </Paper>
    );
};

export default DanceNoteTile;
