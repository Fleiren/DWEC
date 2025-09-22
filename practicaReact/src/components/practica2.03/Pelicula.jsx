import React from 'react';
import './Pelicula.css';

const Pelicula = (props) => {
  return (
    <div className='Pelicula_contenedor'>
      <h2 className='Pelicula_titulo'>{props.titulo}</h2>
      <div className='Pelicula_contenido'>
        <img className='Pelicula_cartelera' src={props.cartelera} alt={props.titulo} ></img>
        <div className='Pelicula_sinopsis'>{props.children}</div>
      </div>
      
      
    </div>
  )
}

export default Pelicula;