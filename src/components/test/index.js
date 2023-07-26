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

   return <img src="https://s12.gifyu.com/images/ScHN6.gif" alt=""/>
}

export default Test;