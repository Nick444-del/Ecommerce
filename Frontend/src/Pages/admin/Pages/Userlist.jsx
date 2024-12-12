import React, { useState, useEffect } from 'react'
import Dashboard from '../Components/Dashboard'
import axiosInstance from '../../../Components/utils/axiosInstance'

const Userlist = () => {
    const [userData, setUserData] = useState()

    const getuserData = async () => {
        try {
            const response = await axiosInstance.get('/getalluserstoadmin')
            console.log(response)
            setUserData(response.data.data)
            console.log(response.data.data.address)
        } catch (error) {
            if(error){
                console.log(error)
            }
        }
    }


    useEffect(() => {
        getuserData()
    }, [])

    return (
        <>
            <Dashboard />
            <div>
                <h1 className='text-[40px] text-center my-[1px] font-medium'>User List</h1>
                <table className="min-w-full table-auto border-collapse bg-white shadow-lg">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="py-3 px-4 text-center font-semibold text-gray-700">Id</th>
                            <th className="py-3 px-4 text-center font-semibold text-gray-700">Name</th>
                            <th className="py-3 px-4 text-center font-semibold text-gray-700">Email</th>
                            <th className='py-3 px-4 text-center font-semibold text-gray-700'>Address</th>
                            <th className="py-3 px-4 text-center font-semibold text-gray-700">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userData && userData.map((index) => {
                                return(
                                    <tr key={index._id}>
                                        <td className="py-3 px-4 text-center">{index._id}</td>
                                        <td className="py-3 px-4 text-center">{index.fullname}</td>
                                        <td className="py-3 px-4 text-center">{index.email}</td>
                                        <td className="py-3 px-4 text-center">{index.address}</td>
                                        <td className="py-3 px-4 text-center">
                                            <button className='bg-red-500 text-white py-2 px-4 rounded'>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

            </div>
        </>
    )
}

export default Userlist