import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Appbar from './Components/Appbar/Appbar';
import Home from './Pages/Home';
import About from './Pages/About';
import Product from './Pages/Product';
import Contact from './Pages/Contact';
import Collection from './Pages/Collection';
import Footer from './Components/Footer/Footer';
import Login from './Pages/Login';
import Cart from './Pages/Cart';
import Signup from './Pages/Signup';
import ProfileDetails from './Pages/ProfileDetails';
import axiosInstance from './Components/utils/axiosInstance';
import './App.css';

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

  const hideAppbarFooter = location.pathname === '/login' || location.pathname === '/signup';

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      {!hideAppbarFooter && <Appbar userInfo={userInfo} />} {/* Show Appbar if not on Login or Signup page */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/product" element={<Product />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profiledetails" element={<ProfileDetails userInfo={userInfo} />} />
      </Routes>

      {!hideAppbarFooter && <Footer />} {/* Show Footer if not on Login or Signup page */}
    </>
  );
}

export default App;
