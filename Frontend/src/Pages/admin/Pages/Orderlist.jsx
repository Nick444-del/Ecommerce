import React, { useState, useEffect } from 'react'
import AdminNavbar from '../Components/AdminNavbar'
import axiosInstance from '../../../Components/utils/axiosInstance';

const Orderlist = () => {
    const [data, setData] = useState([]);
    const [filepath, setFilePath] = useState("");

    const getData = async () => {
        try {
            const data = await axiosInstance.get('/getallcart')
            setData(data.data.data)
            setFilePath(data.data.filepath)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <>
            {/* <AdminNavbar /> */}
            <h1 className='text-3xl font-semibold text-gray-800'>Order List</h1>
        </>
    )
}

export default Orderlist