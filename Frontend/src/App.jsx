import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import PublicRoute from './Routes/PublicRoute';
import AdminRoute from './Routes/AdminRoute';
import Home from './Pages/Home';
import About from './Pages/About';
import Product from './Pages/Product';
import Contact from './Pages/Contact';
import Collection from './Pages/Collection';
import ProductDetails from './Pages/ProductDetails';
import Login from './Pages/Login';
import Cart from './Pages/Cart';
import ChangePassword from './Pages/ChangePassword';
import Signup from './Pages/Signup';
import ProfileDetails from './Pages/ProfileDetails';
import Favorite from './Pages/favorite';
import CollectionProduct from './Pages/CollectionProduct';
import axiosInstance from './Components/utils/axiosInstance';
import Userlist from './Pages/admin/Pages/Userlist';
import AdminLogin from './Pages/admin/Pages/AdminLogin';
import './App.css';
import Categorieslist from './Pages/admin/Pages/Categorieslist';
import Productlist from './Pages/admin/Pages/Productlist';
import Orderlist from './Pages/admin/Pages/Orderlist';

function App() {
  const [userInfo, setUserInfo] = useState(null);

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/getuser")
      if (response.data && response.data.user) {
        setUserInfo(response.data.user)
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login")
      }
    }
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>

      <Routes>
        {/* User routes */}
        <Route path='/bookwormdenn' element={<PublicRoute userInfo={userInfo} />} >
          <Route path="/bookwormdenn" element={<Home getUserInfo={getUserInfo} />} />
          <Route path="/bookwormdenn/about" element={<About />} />
          <Route path="/bookwormdenn/product" element={<Product />} />
          <Route path="/bookwormdenn/contact" element={<Contact />} />
          <Route path="/bookwormdenn/collection" element={<Collection />} />
          <Route path="/bookwormdenn/cart" element={<Cart />} />
          <Route path='/bookwormdenn/category/:categoryId' element={<CollectionProduct />} />
          <Route path='/bookwormdenn/productdetails/:productId' element={<ProductDetails />} />
          <Route path="/bookwormdenn/profiledetails" element={<ProfileDetails userInfo={userInfo} />} />
          <Route path='/bookwormdenn/profiledetails/changepassword' element={<ChangePassword />} />
          <Route path='/bookwormdenn/favorite' element={<Favorite userInfo={userInfo} />} />
        </Route>
        {/* Admin routes */}
        <Route path="/bookwormdenn/admin" element={<AdminRoute />}>
          <Route path="/bookwormdenn/admin/userslist" element={<Userlist />} />
          <Route path="/bookwormdenn/admin/categorieslist" element={<Categorieslist />} />
          <Route path="/bookwormdenn/admin/productslist" element={<Productlist />} />
          <Route path='/bookwormdenn/admin/orderslist' element={<Orderlist />} />
        </Route>

        <Route path='/bookwormdenn/adminlogin' element={<AdminLogin />} />
        <Route path="/bookwormdenn/login" element={<Login />} />
        <Route path="/bookwormdenn/signup" element={<Signup />} />
      </Routes>

    </>
  );
}

export default App;
