import { React, useEffect } from 'react'
import { getGif } from '../../services/gifyuApi'

const Test = () => {
   const fetchGif = () => {
      const response = getGif();
      alert(response)
   }
   
   useEffect(() => {
      fetchGif();
   })

   return <h1>Hello</h1>
}

export default Test;