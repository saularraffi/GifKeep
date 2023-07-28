import { React, useEffect, useState } from 'react'

const Test = () => {
   //array to hold jsx for pokemon
   const data = [{name: 'name'}, {name: 'name2'}]
   const pokemonJSX = [];

   //loop over data
   for (let poke of data) {
      // push jsx into array
      pokemonJSX.push(
      <section key={poke.name}>
         <h1>{poke.name}</h1>
      </section>
      );
   }

   // render data in jsx
   return <div>{pokemonJSX}</div>;
}

export default Test;