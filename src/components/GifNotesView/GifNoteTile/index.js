import { React } from 'react'
import { Container, Typography, Divider, Paper } from '@material-ui/core'

const GifNoteTile = ({note, gifUrl}) => {
    const styles = {
        root: {
            backgroundColor: "white",
            padding: "20px 0 0 0",
            border: "1px solid rgba(0, 0, 0, 0.12)"
        },
        img: {
            width: "100%",
            borderRadius: "5px"
        },
        typography: {
            fontFamily: "Bree Serif",
            fontSize: "20px",
            paddingTop: "15px",
            paddingBottom: "15px"
        },
        divider: {
            marginTop: "15px",
            width: "100%",
            borderBottomWidth: "20px"
        }
    }

    return (
        <Paper style={styles.root} elevation={2}>
            <Container>
                <img src={gifUrl} alt="" style={styles.img}/>
            </Container>
            <Divider style={styles.divider} />
            <Container>
                <Typography style={styles.typography}>{note}</Typography>
            </Container>
        </Paper>
    )
}

export default GifNoteTile;