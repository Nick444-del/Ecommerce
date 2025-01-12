import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { Typography } from '@mui/material'
import { IoMdAddCircleOutline } from "react-icons/io";
import axiosInstance from '../../../Components/utils/axiosInstance'
import CategoryModal from '../Components/CategoryModal'
import toast from 'react-hot-toast'

const Categorieslist = () => {
    const [openModal, setOpenModal] = useState({
        isShown: false,
        type: 'add',
        data: null
    })
    const [deleteModal, setDeleteModal] = useState({
        isShown: false,
        categoryId: null,
    })
    const [category, setCategory] = useState([])
    const [filepath, setFilepath] = useState("")
    const [editCategory, setEditCategory] = useState(null)

    // Fetch all categories
    const getAllCategories = async () => {
        const response = await axiosInstance.get('/getallcategory')
        setCategory(response.data.data)
        setFilepath(response.data.filepath)
    }

    // Add Category
    const handleAddCategory = () => {
        setOpenModal({
            isShown: true,
            type: 'add',
            data: null
        })
    }

    // Edit Category
    const handleEdit = (categoryId) => {
        const categoryData = category.find((item) => item._id === categoryId)
        setOpenModal({
            isShown: true,
            type: 'edit',
            data: categoryData,
            categoryId: categoryId
        })
        setEditCategory(categoryData)
    }

    // Open Delete Confirmation Modal
    const confirmDelete = (categoryId) => {
        setDeleteModal({
            isShown: true,
            categoryId: categoryId
        })
    }

    // Delete Category
    const handleDelete = async () => {
        try {
            const response = await axiosInstance.delete(`/deletecategory/${deleteModal.categoryId}`)
            if (response.data && response.data.success) {
                console.log("Category deleted successfully:", response.data.message)
                getAllCategories()
                toast.success(response.data.message)
            } else {
                console.error("Failed to delete category:", response.data.message || "Unknown error")
            }
        } catch (error) {
            console.error("Error occurred while deleting category:", error.message || error)
        } finally {
            setDeleteModal({ isShown: false, categoryId: null })
        }
    }

    useEffect(() => {
        getAllCategories()
    }, [])

    return (
        <>
            {/* Page Header */}
            <div className='flex justify-between items-center p-6'>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                    Category
                </Typography>
                <button className='bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300' onClick={handleAddCategory}>
                    <IoMdAddCircleOutline className='w-6 h-6' />
                </button>
            </div>

            {/* Categories Table */}
            <div className='overflow-x-auto px-6'>
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                    <thead className="bg-gray-100">
                        <tr className="text-gray-600">
                            <th className="py-4 px-6 text-center font-medium">Sr no</th>
                            <th className="py-4 px-6 text-center font-medium">Category Name</th>
                            <th className="py-4 px-6 text-center font-medium">Category Image</th>
                            <th className="py-4 px-6 text-center font-medium">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {category && category.map((index, i) => (
                            <tr key={index._id} className="border-b hover:bg-gray-50">
                                <td className="py-4 px-6 text-center text-gray-700">{i + 1}</td>
                                <td className="py-4 px-6 text-center capitalize text-gray-700">{index.categoryName}</td>
                                <td className="py-4 px-6 flex items-center justify-center">
                                    <img src={filepath + index.categoryImage} alt={index.categoryName} className="w-16 h-16 object-cover rounded-lg mx-auto" />
                                </td>
                                <td className="py-4 px-6 text-center space-x-4">
                                    <button className="text-blue-600 hover:text-blue-800 font-semibold transition duration-300" onClick={() => handleEdit(index._id)}>
                                        Edit
                                    </button>
                                    <button className="text-red-600 hover:text-red-800 font-semibold transition duration-300" onClick={() => confirmDelete(index._id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add/Edit Modal */}
            <Modal
                isOpen={openModal.isShown}
                onRequestClose={() => setOpenModal({ isShown: false, type: "add", data: null })}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0,0,0,0.5)",
                    },
                }}
                className='w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-20 p-5 overflow-auto'
            >
                <CategoryModal
                    type={openModal.type}
                    categoryData={editCategory}
                    filepath={filepath}
                    onClose={() => setOpenModal({ isShown: false, type: "add", data: null })}
                    getAllCategories={getAllCategories}
                />
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={deleteModal.isShown}
                onRequestClose={() => setDeleteModal({ isShown: false, categoryId: null })}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0,0,0,0.5)",
                    },
                }}
                className='w-[30%] bg-white rounded-md mx-auto mt-20 p-6 text-center'
            >
                <h2 className='text-xl font-semibold text-gray-800 mb-4'>Confirm Deletion</h2>
                <p className='text-gray-600 mb-6'>Are you sure you want to delete this category?</p>
                <div className='flex justify-center gap-4'>
                    <button
                        className='bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300'
                        onClick={handleDelete}
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

export default Categorieslist
