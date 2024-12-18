import React from 'react'
import AdminNavbar from '../Pages/admin/Components/AdminNavbar'
import { Outlet } from 'react-router-dom'

const AdminRoute = () => {
    return (
        <>
            <AdminNavbar />
                <Outlet />
        </>
    )
}

export default AdminRoute