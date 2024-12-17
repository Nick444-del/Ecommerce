import React, { useState, useEffect } from 'react'
import axiosInstance from '../Components/utils/axiosInstance'

const Cart = () => {
    const [data, setData] = useState([]);

    const getAllData = async () => {
        try {
            const response = await axiosInstance.get('/getallcart')
            setData(response.data)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllData()
    }, [])


    return (
        <div>
            <h1 className='text-[40px] font-bold text-center'>Cart</h1>
            <div className='mx-[260px] px-[50px]'>
            </div>
        </div>
    )
}

export default Cart