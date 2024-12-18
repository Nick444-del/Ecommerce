import React from 'react'
import Appbar from '../Components/Appbar/Appbar'
import Footer from '../Components/Footer/Footer'
import { Outlet } from 'react-router-dom'

const PublicRoute = ({ userInfo }) => {
    return (
        <>
            <Appbar userInfo={userInfo}/>
            <Outlet />
            <Footer />
        </>
    )
}

export default PublicRoute