import { useState, useEffect } from 'react'
import { Route, BrowserRouter as Router, Routes } from "react-router"
// Este es el archivo css que usaremos para darleestilos a la página (tailwind es usado en pocas ocasiones)
import './index.css'
// Página de inicio
import Home from './pages/contenido/homes';
// Página de iniciar sesión o registrarse
import RegLog from './pages/contenido/reg-log';
import Perfil from './pages/usuario/perfil';
import Productos from './pages/usuario/productos';
import Editar from './pages/usuario/editar';
import Carrito from './pages/usuario/carrito';
import PassPage from './pages/admin/pass-page';
import Admin from './pages/admin/admin';

function App() {
  const hello = "Hola, admin"
  const inf = "Todo parece estar en orden . . "
  const advert = "0 días desde la última caída del servidor"
  const holi = "Holi"
  return (
    <>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<RegLog />} />
          <Route path="/perfil" element={<Perfil saludo={holi} />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/editar" element={<Editar />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/charging" element={<PassPage />} />
          <Route path='admin' element={<Admin saludo={hello} info={inf} adv={advert}/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
