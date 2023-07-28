import { React, useEffect, useState } from 'react'

const GifNoteTile = ({note, category, gifUrl}) => {
    const styles = {
        img: {
            width: "400px"
        }
    }

    useEffect(() => {

    })

    return (
        <div>
            <p>Note: {note}</p>
            <p>Category: {category}</p>
            <img src={gifUrl} alt="" style={styles.img}/>
        </div>
    )
}

export default GifNoteTile;