import React from 'react'
import AdminNavbar from '../Pages/admin/Components/AdminNavbar'
// import AdminSidebar from '../Pages/admin/Components/AdminSidebar'
import { Outlet } from 'react-router-dom'

const AdminRoute = () => {
    return (
        <>
            <AdminNavbar />
            {/* <AdminSidebar /> */}
                <Outlet />
        </>
    )
}

export default AdminRoute