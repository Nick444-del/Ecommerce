import React, { useState, useEffect } from 'react'
import axiosInstance from '../../../Components/utils/axiosInstance'
import { Typography } from '@mui/material'
import Modal from 'react-modal'
import toast from 'react-hot-toast'

const Userlist = () => {
    const [deleteModal, setDeleteModal] = useState({
        isShown: false,
        userId: null
    })
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

    const handleUserDelete = async () => {
        try {
            const response = await axiosInstance.delete(`/deleteuserinadmin/${deleteModal.userId}`)
            console.log(response)
            if (response.status === 200) {
                getuserData()
                toast.success("User deleted successfully")
            }
        } catch (error) {
            console.log(error)
        } finally {
            setDeleteModal({ isShown: false, userId: null })
        }
    }


    useEffect(() => {
        getuserData()
    }, [])

    return (
        <>
            {/* <AdminNavbar /> */}
            <div>
                <div className='flex justify-between items-center p-6'>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                        User List
                    </Typography>
                </div>
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
                                                <button onClick={() => setDeleteModal({ isShown: true, userId: index._id })} className='bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors'>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal
                isOpen={deleteModal.isShown}
                onRequestClose={() => setDeleteModal({ isShown: false, userId: null })}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0,0,0,0.5)",
                    },
                }}
                className='w-[30%] bg-white rounded-md mx-auto mt-20 p-6 text-center'>
                <h2 className='text-xl font-semibold text-gray-800 mb-4'>Confirm Deletion</h2>
                <p className='text-gray-600 mb-6'>Are you sure you want to delete this category?</p>
                <div className='flex justify-center gap-4'>
                    <button
                        className='bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300'
                        onClick={handleUserDelete}
                    >
                        Yes, Delete
                    </button>
                    <button
                        className='bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300'
                        onClick={() => setDeleteModal({ isShown: false, categoryId: null })}
                    >
                        Cancel
                    </button>
                </div>
            </Modal>
        </>
    )
}

export default Userlist