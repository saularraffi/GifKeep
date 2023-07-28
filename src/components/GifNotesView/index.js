import { React, useEffect, useRef, useState } from 'react'
import { getGifNotes } from '../../services/gifyuApi'
import GifNoteTile from './GifNoteTile'

const GifNoteView = () => {
    const [gifNotes, setGifNotes] = useState([]);

    useEffect(() => {
        getGifNotes().then(data => {
            setGifNotes(data);
        });
    }, [])

    return (
        <>
            {gifNotes.map((gifNote) => { 
                return <GifNoteTile
                    key={gifNote._id}
                    note={gifNote.note} 
                    category={gifNote.category} 
                    gifUrl={gifNote.gifUrl}
                />
            })}
        </>
    )
}

export default GifNoteView;