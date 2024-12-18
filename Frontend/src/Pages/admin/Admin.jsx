import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';
import AdminNavbar from './Components/AdminNavbar';
import Userlist from './Pages/Userlist';
import Productlist from './Pages/Productlist';
import Categorieslist from './Pages/Categorieslist';

const Admin = () => {
    return (
        <>
            <AdminNavbar />
        </>
    )
}

export default Admin