import React from 'react'
import { createRoutesFromElements, Route, RouterProvider } from 'react-router'
import Layout from './components/Layout'
import Home from './pages/Home'
import { createBrowserRouter } from 'react-router-dom'
import './App.css'
import Shop from './pages/Shop'
import ShopDetails from './pages/ShopDetails'
import ShopCart from './pages/ShopCart'
import Checkout from './pages/Checkout'
import BlogDetail from './pages/BlogDetail'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import Register from './pages/Register'
import Login from './components/Login'
import { useSelector } from 'react-redux';
import Error from './pages/Error'
import AddProduct from './pages/admin/AddProduct'
import ProtectedRoute from './components/protected/ProtectedRoute'

const App = () => {

  const {isAuthenticated} = useSelector(state=>state.auth)

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout/>}>
        <Route path='/' element={<Home/>}/>
        <Route path='/shop' element={<Shop/>}/>
        <Route path='/shop-details' element={<ShopDetails/>}/>
        <Route path='/cart' element={<ShopCart/>}/>
        <Route path='/check-out' element={<Checkout/>}/>
        <Route path='/blog-details' element={<BlogDetail/>}/>
        <Route path='/blog' element={<Blog/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>

        <Route path='admin' element={<ProtectedRoute/>}>
          <Route path='add-product' element={<AddProduct/>}/>
        </Route>
      </Route>
    )
  )
  return (
    <>
    
    <RouterProvider router={router}/>
     
    </>
  )
}

export default App
