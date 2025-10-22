import Contenedor from './components/Contenedor.jsx';
import Pelicula from './components/Pelicula.jsx';
import Elenco from './components/Elenco.jsx';
import Taquilla from './components/Taquilla.jsx';
import datos from './assets/data/peliculas.json';
import { useRef } from 'react';
import './App.css'

function App() {
//He creado un JSON con películas, creo que me vendrá bien para las siguientes prácticas y así practico.
 const peliculas = datos.peliculas;
 const elencoRef = useRef(null);
 const taquillaRef = useRef(null);
 //con toggle y el useRef podemos mostrar y ocultar la información de los div ya que detecta si tiene o no la clase ocultar.
 const mostrarElenco = () => {
  elencoRef.current.classList.toggle("ocultar");
 }

 const mostrarTaquilla = () => {
  taquillaRef.current.classList.toggle("ocultar");
 }
//Siento que se puede simplificar mucho más esto.
  return (
    <>
      <Contenedor>
        <div className="pelicula">
          <Pelicula titulo={peliculas[0].titulo} cartelera={peliculas[0].cartelera} direccion={peliculas[0].direccion} sinopsis={peliculas[0].sinopsis} ></Pelicula>
        </div>
        <div className='botones'>
          <button onClick={()=>{
            mostrarElenco();
          }}>Elenco</button>
          <button className="boton_taquilla"onClick={()=>{
            mostrarTaquilla();
          }}>Taquilla</button>
        </div>
        {
        //Si el div tiene la clase ocultar, no se mostrará el componente.
        }
        <div className="ocultar elenco" ref={elencoRef}>
          <Elenco elenco={peliculas[0].elenco}></Elenco>
        </div>
        <div className="ocultar taquilla" ref={taquillaRef}>
          <Taquilla taquilla={peliculas[0].taquilla}></Taquilla>
        </div>
        
      </Contenedor>
    </>
  )
}

export default App
