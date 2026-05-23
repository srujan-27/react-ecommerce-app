import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MainLayout from './components/MainLayout.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './utils/ScrollToTop.jsx'
import Browse from './pages/Browse.jsx'
import Product from './pages/Product.jsx'
import Login from './pages/Login.jsx'
import Cart from './pages/Cart.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Browse/>}></Route>
          <Route path="/product/:id" element={<Product/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/cart" element={<Cart />} />
        </Route> 
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
