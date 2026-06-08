import { useState, useEffect } from 'react'
import { Route, BrowserRouter as Router, Routes } from "react-router"
// Este es el archivo css que usaremos para darleestilos a la página (tailwind es usado en pocas ocasiones)
import './index.css'
// Página de inicio
import Home from './components/Homes';
// Página de iniciar sesión o registrarse
import RegLog from './components/RegLog';
import Perfil from './components/Perfil';
import Productos from './components/Productos';
import Editar from './components/Editar';
import Carrito from './components/Carrito';
import PassPage from './components/PassPage';
import Admin from './components/Admin';

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<RegLog />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/editar" element={<Editar />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/charging" element={<PassPage />} />
          <Route path='admin' element={<Admin />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
