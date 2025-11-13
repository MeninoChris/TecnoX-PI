import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './main.css'
import Cadastro from './Pages/Cadastro/cadastro'
import Login from './Pages/Login/Login'
import Home from './Pages/Home/index.jsx'
import Sobre from './Pages/Sobre/index.jsx'
import Products from './Pages/Products/index.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/produtos' element={<Products/>}/>
        <Route path='/cadastro' element={<Cadastro/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/sobre' element={<Sobre/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
