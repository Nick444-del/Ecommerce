import React from 'react'
import { NavLink } from 'react-router-dom'
import { getInitials } from '../utils/helper'

const ProfileIcon = ({ userInfo, onLogout }) => {
    const isLoggedIn = Boolean(localStorage.getItem('token'));

    return (
        <>
            <div className='flex items-center gap-3'>
                {isLoggedIn ? (
                    <NavLink to='/bookwormdenn/profiledetails'>
                        <div className='w-12 h-12 flex items-center justify-center rounded-full bg-gray-400 text-slate-950 font-medium bg-vista_blue'>
                            {getInitials(userInfo?.fullname)}
                        </div>
                    </NavLink>
                ) : (
                    <div className='w-12 h-12 flex items-center justify-center rounded-full bg-gray-400 text-slate-950 font-medium bg-vista_blue'>
                        ?
                    </div>
                )}
                <div>
                    <p className='text-sm font-medium uppercase text-leather'>
                        {isLoggedIn ? userInfo?.fullname : 'Guest'}
                    </p>
                    <button 
                        className='text-sm text-light_tan underline' 
                        onClick={onLogout}
                    >
                        {isLoggedIn ? 'Logout' : 'Login'}
                    </button>
                </div>
            </div>
        </>
    )
}

export default ProfileIcon
