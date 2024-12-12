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

  const hideAppbarFooter = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/admin' || location.pathname === '/admin/dashboard/userslist' || location.pathname === '/admin/dashboard/categorieslist' || location.pathname === '/admin/dashboard/productslist' || location.pathname === '/admin/dashboard';

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      {!hideAppbarFooter && <Appbar userInfo={userInfo} />} {/* Show Appbar if not on Login or Signup page */}

      <Routes>
        {/* User routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/product" element={<Product />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/category/:categoryId' element={<CollectionProduct />} />
        <Route path='/productdetails/:productId' element={<ProductDetails />} />
        <Route path="/profiledetails" element={<ProfileDetails userInfo={userInfo} />} />
        {/* Admin routes */}
        <Route path="/admin/dashboard" element={<Admin />} />
        <Route path='/admin' element={<AdminLogin />}/>
        <Route path="/admin/dashboard/userslist" element={<Userlist />} />
        <Route  path="/admin/dashboard/categorieslist" element={<Categorieslist />} />
        <Route  path="/admin/dashboard/productslist" element={<Productlist />} />
      </Routes>

      {!hideAppbarFooter && <Footer />} {/* Show Footer if not on Login or Signup page */}
    </>
  );
}

export default App;
