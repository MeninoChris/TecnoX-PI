import React, { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import './main.css'
import Cadastro from './Pages/Cadastro/cadastro'
import Login from './Pages/Login/Login'
import Home from './Pages/Home/index.jsx'
import Sobre from './Pages/Sobre/index.jsx'
import Perifericos from './Pages/Perifericos/index.jsx'
import Produtos from './Pages/Produtos/index.jsx'
import CartPage from './Pages/Carrinho/index.jsx'
import CheckoutPage from './Pages/Checkout/index.jsx'
import ProdutoDetalhe from './Pages/ProdutoDetalhe/index.jsx'
import AdminProdutos from './Pages/AdminProdutos/index.jsx'

// Componente para garantir que a página volte ao topo a cada troca de rota
const ScrollToTop = () => {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname])

  return null
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/produtos' element={<Produtos />} />
        <Route path='/perifericos' element={<Perifericos />} />
        <Route path='/produto/:id' element={<ProdutoDetalhe/>}/>
        <Route path='/admin/produtos' element={<AdminProdutos/>}/>
        <Route path='/cadastro' element={<Cadastro/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/sobre' element={<Sobre/>}/>
        <Route path='/carrinho' element={<CartPage/>}/>
        <Route path='/checkout' element={<CheckoutPage/>}/>
      </Routes>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
    </BrowserRouter>
  </StrictMode>,
)
