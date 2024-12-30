import React, { useState } from 'react'
import ProfileIcon from '../UserIcon/ProfileIcon'
import RightDrawer from './RightDrawer'
import Searchbar from '../Searchbar/Searchbar'
import logo1 from '../../assets/images/logi1.png'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import FavoriteIcon from '@mui/icons-material/Favorite';
import toast from 'react-hot-toast'

const Appbar = ({ userInfo }) => {
    const [searchQuery, setSearchQuery] = useState('')

    const navigate = useNavigate();

    const onLogout = () => {
        localStorage.clear()
        localStorage.removeItem("token")
        navigate('/bookwormdenn/login')
        toast.success("Logout Successfully!")
    }
    const handleSearch = () => {
        if (searchQuery) {
            onSearchNote(searchQuery)
        }
    };

    const onClearSearch = () => {
        setSearchQuery("");
        handleSearch();
    }


    return (
        <>
            <nav className='bg-white py-4 text-black font-bold flex flex-row justify-around items-center'>
                <div className="logo">
                    <NavLink to="/bookwormdenn">
                        <img src={logo1} alt="logo" className='w-[70px] h-[70px]' />
                    </NavLink>
                </div>
                <div className='searchbar'>
                    <Searchbar
                        value={searchQuery}
                        onChange={({ target }) => { setSearchQuery(target.value); }}
                        handleSearch={handleSearch}
                        onClearSearch={onClearSearch}
                    />
                </div>
                <div className='flex flex-row items-center justify-center gap-2'>
                    <NavLink to='/bookwormdenn/favorite'><FavoriteIcon className='mx-[6px] text-red-600'/></NavLink>
                    <NavLink to="/bookwormdenn/cart"><ShoppingCartIcon className='mx-[10px] text-yellow-600' /></NavLink>
                    <ProfileIcon className='mx-[10px]' userInfo={userInfo} onLogout={onLogout} />
                    <div className="nav">
                        <RightDrawer />
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Appbar