import React, { useEffect } from 'react'
import { Footer, Navbar } from './components/layout'
import Home from './pages/Home.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound'
import AddProduct from './pages/admin/products/AddProduct'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import ProductList from './pages/admin/products/ProductList'
import EditProduct from './pages/admin/products/EditProduct.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import Register from './pages/auth/Register.jsx'
import Login from './pages/auth/Login.jsx'  
import { AppContext } from './AppContext.jsx'
import { AdminRoute, AuthRoute } from './components/auth.jsx'
import UserProfile from './pages/UserProfile.jsx'
import UserList from './pages/admin/users/UserList.jsx'
import UserInfo from './pages/admin/users/UserInfo.jsx'
import Cart from './pages/user/Cart.jsx'
import Checkout from './pages/user/Checkout.jsx'
import Rate from './pages/user/Rate.jsx'
import OrderHistory from './pages/user/OrderHistory.jsx'

export default function App() {
    function getUserCredentials() {
        let data = localStorage.getItem('user')
        if (data != undefined) {
            return JSON.parse(data)
        }
        return null
    }


    const [userCredentials, setUserCredentials] = React.useState(getUserCredentials())
    useEffect(() => {
        let str = JSON.stringify(userCredentials)
        localStorage.setItem('user', str)
        console.log(userCredentials)
    },[userCredentials])

    return (
      <AppContext.Provider value={{userCredentials, setUserCredentials}}>
      <React.StrictMode>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/profile" element={<AuthRoute ><UserProfile /></AuthRoute>} />
  
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />
  
  
        <Route path="/admin/products" element={<AdminRoute ><ProductList /></AdminRoute>} />
        <Route path="/admin/products/add" element={<AdminRoute ><AddProduct /></AdminRoute>} />
        <Route path="/admin/products/edit/:id" element={<AdminRoute ><EditProduct /></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute ><UserList /></AdminRoute>} />
        <Route path="/admin/user/:id" element={<AdminRoute ><UserInfo /></AdminRoute>} />

        <Route path="/user/cart" element={<AuthRoute ><Cart /></AuthRoute>} />
        <Route path="/user/checkout" element={<AuthRoute ><Checkout /></AuthRoute>} />
        <Route path="/user/rate" element={<AuthRoute ><Rate /></AuthRoute>} />
        <Route path="/user/history" element={<AuthRoute ><OrderHistory/></AuthRoute>} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
        <Footer/>
      </BrowserRouter>
  
    </React.StrictMode>
    </AppContext.Provider> 
    )
  }