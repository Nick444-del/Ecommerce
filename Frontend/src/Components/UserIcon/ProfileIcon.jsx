import React from 'react'
import { NavLink } from 'react-router-dom'
import { getInitials } from '../utils/helper'

const ProfileIcon = ({ userInfo, onLogout }) => {
    return (
        <>
            <div className='flex items-center gap-3'>
                <NavLink to='/bookwormdenn/profiledetails'>
                    <div className='w-12 h-12 flex items-center justify-center rounded-full bg-gray-400 text-slate-950 font-medium bg-vista_blue'>{getInitials(userInfo?.fullname)}</div>
                </NavLink>
                <div>
                    <p className='text-sm font-medium uppercase text-leather'>{userInfo?.fullname}</p>
                    <button className='text-sm text-light_tan underline' onClick={onLogout}>Logout</button>
                </div>
            </div>
        </>
    )
}

export default ProfileIcon