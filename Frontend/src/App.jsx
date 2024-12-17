import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Appbar from './Components/Appbar/Appbar';
import Home from './Pages/Home';
import About from './Pages/About';
import Product from './Pages/Product';
import Contact from './Pages/Contact';
import Collection from './Pages/Collection';
import ProductDetails from './Pages/ProductDetails';
import Footer from './Components/Footer/Footer';
import Login from './Pages/Login';
import Cart from './Pages/Cart';
import ChangePassword from './Pages/ChangePassword';
import Signup from './Pages/Signup';
import ProfileDetails from './Pages/ProfileDetails';
import Admin from './Pages/admin/Admin';
import CollectionProduct from './Pages/CollectionProduct';
import axiosInstance from './Components/utils/axiosInstance';
import Userlist from './Pages/admin/Pages/Userlist';
import AdminLogin from './Pages/admin/Pages/AdminLogin';
import './App.css';
import Categorieslist from './Pages/admin/Pages/Categorieslist';
import Productlist from './Pages/admin/Pages/Productlist';

function App() {
  const location = useLocation();
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

  const hideAppbarFooter = location.pathname === '/bookwormdenn/login' || location.pathname === '/bookwormdenn/signup' || location.pathname === '/bookwormdenn/admin' || location.pathname === '/bookwormdenn/admin/dashboard/userslist' || location.pathname === '/bookwormdenn/admin/dashboard/categorieslist' || location.pathname === '/bookwormdenn/admin/dashboard/productslist' || location.pathname === '/bookwormdenn/admin/dashboard';

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      {!hideAppbarFooter && <Appbar userInfo={userInfo} />} {/* Show Appbar if not on Login or Signup page */}

      <Routes>
        {/* User routes */}
        <Route path="/bookwormdenn" element={<Home />} />
        <Route path="/bookwormdenn/about" element={<About />} />
        <Route path="/bookwormdenn/product" element={<Product />} />
        <Route path="/bookwormdenn/contact" element={<Contact />} />
        <Route path="/bookwormdenn/collection" element={<Collection />} />
        <Route path="/bookwormdenn/login" element={<Login />} />
        <Route path="/bookwormdenn/cart" element={<Cart />} />
        <Route path="/bookwormdenn/signup" element={<Signup />} />
        <Route path='/bookwormdenn/category/:categoryId' element={<CollectionProduct />} />
        <Route path='/bookwormdenn/productdetails/:productId' element={<ProductDetails />} />
        <Route path="/bookwormdenn/profiledetails" element={<ProfileDetails userInfo={userInfo} />} />
        <Route path='/bookwormdenn/profiledetails/changepassword' element={<ChangePassword />} />
        {/* Admin routes */}
        <Route path="/bookwormdenn/admin/dashboard" element={<Admin />} />
        <Route path='/bookwormdenn/admin' element={<AdminLogin />}/>
        <Route path="/bookwormdenn/admin/dashboard/userslist" element={<Userlist />} />
        <Route  path="/bookwormdenn/admin/dashboard/categorieslist" element={<Categorieslist />} />
        <Route  path="/bookwormdenn/admin/dashboard/productslist" element={<Productlist />} />
      </Routes>

      {!hideAppbarFooter && <Footer />} {/* Show Footer if not on Login or Signup page */}
    </>
  );
}

export default App;
