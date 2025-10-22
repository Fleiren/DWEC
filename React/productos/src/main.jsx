import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/*Envolvemos la aplicación con BrowserRouter para poder acceder a todos los componentes de react-router-dom en toda la app.*/}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
