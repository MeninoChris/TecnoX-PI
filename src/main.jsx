import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router';
import './main.css'
import Cadastro from './Pages/Cadastro/cadastro'
import Login from './Pages/Login/Login'
import Home from './Pages/Home'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Cadastro/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Home' element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
