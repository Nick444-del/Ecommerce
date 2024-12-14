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
        } catch (error) {
            if (error) {
                console.log(error)
            }
        }
    }

    const handleUserDelete = async (userId) => {
        try {
            const response = await axiosInstance.delete(`/deleteuserinadmin/${userId}`)
            console.log(response)
            if (response.status === 200) {
                getuserData()
            }
        } catch (error) {
            console.log(error)
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
                <div className='overflow-x-auto px-6'>
                    <table className="min-w-full table-auto border-collapse bg-white shadow-lg">
                        <thead>
                            <tr className="bg-gray-100 border-b border-gray-300">
                                <th className="py-3 px-4 text-center font-semibold text-gray-700">Id</th>
                                <th className="py-3 px-4 text-center font-semibold text-gray-700">Name</th>
                                <th className="py-3 px-4 text-center font-semibold text-gray-700">Email</th>
                                <th className="py-3 px-4 text-center font-semibold text-gray-700">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                userData && userData.map((index) => {
                                    return (
                                        <tr key={index._id}>
                                            <td className="py-3 px-4 text-center">{index._id}</td>
                                            <td className="py-3 px-4 text-center">{index.fullname}</td>
                                            <td className="py-3 px-4 text-center">{index.email}</td>
                                            <td className="py-3 px-4 text-center">
                                                <button onClick={() => handleUserDelete(index._id)} className='bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors'>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Userlist