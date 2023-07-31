import { React } from 'react'
import { Container, Typography, Paper } from '@mui/material'

const styles = {
    root: {
        backgroundColor: "white",
        border: "1px solid rgba(0, 0, 0, 0.12)"
    },
    img: {
        width: "100%",
    },
    typography: {
        fontSize: "20px",
        paddingTop: "15px",
        paddingBottom: "15px"
    }
}

const GifNoteTile = ({note, gifUrl}) => {
    return (
        <Paper style={styles.root} elevation={2}>
            <img src={gifUrl} alt="" style={styles.img}/>
            <Container>
                <Typography style={styles.typography}>{note}</Typography>
            </Container>
        </Paper>
    )
}

export default GifNoteTile;