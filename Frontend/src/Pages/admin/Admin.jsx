import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Userlist from './Pages/Userlist';
import Productlist from './Pages/Productlist';
import Categorieslist from './Pages/Categorieslist';

const Admin = () => {
    return (
        <>
            <Dashboard />
            <Routes>
                <Route to={"/userslist"} element={<Userlist />} />
                <Route to={"/categorieslist"} element={<Categorieslist />} />
                <Route to={"/productlist"} element={<Productlist />} />
            </Routes>
        </>
    )
}

export default Admin