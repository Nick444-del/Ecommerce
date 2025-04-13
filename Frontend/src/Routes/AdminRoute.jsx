import React from 'react'
import leftDrawer from '../Pages/admin/Components/LeftDrawer'
import { Outlet } from 'react-router-dom'

const AdminRoute = () => {
    return (
        <>
            <leftDrawer>
                <Outlet />
            </leftDrawer>
        </>
    )
}

export default AdminRoute