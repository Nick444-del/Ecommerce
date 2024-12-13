import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import Dashboard from '../Components/Dashboard'
import axiosInstance from '../../../Components/utils/axiosInstance'
import { BASE_URL } from '../../../Components/utils/constant'
import CategoryModal from '../Components/CategoryModal'

const Categorieslist = () => {
    const [openModal, setOpenModal] = useState({
        isShown: false,
        type: 'add',
        data: null
    })
    const [category, setCategory] = useState([])

    const getAllCategories = async () => {
        const response = await axiosInstance.get('/getallcategory');
        console.log(response.data.data)
        setCategory(response.data.data)
    }

    const handleAddCategory = () => {
        setOpenModal({
            isShown: true,
            type: 'add',
            data: null
        })
    }

    const handleEdit = (categoryId) => {
        const categoryData = category.find((item) => item._id === categoryId);
        setOpenModal({
            isShown: true,
            type: 'edit',
            data: categoryData,
        });
    };


    const handleDelete = async (categoryId) => {
        try {
            const response = await axiosInstance.delete(`/deletecategory/${categoryId}`);

            // Assuming the response structure has a success message or status in data
            if (response.data && response.data.success) {
                console.log("Category deleted successfully:", response.data.message); // Log success message
                getAllCategories(); // Reload categories after deletion
            } else {
                // Handle failure in response data
                console.error("Failed to delete category:", response.data.message || "Unknown error");
            }
        } catch (error) {
            console.error("Error occurred while deleting category:", error.message || error); // Improved error logging
            // You can also add state to show an error message to the user in the UI
        }
    }


    useEffect(() => {
        getAllCategories()
    }, [])


    return (
        <>
            <Dashboard />
            <div className='flex justify-between items-center p-6'>
                <h1 className='text-3xl font-semibold text-gray-800'>Categories List</h1>
                <button className='bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300' onClick={() => handleAddCategory()}>Add Category</button>
            </div>

            <div className='overflow-x-auto px-6'>
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                    <thead className="bg-gray-100">
                        <tr className="text-gray-600">
                            <th className="py-4 px-6 text-center font-medium">Id</th>
                            <th className="py-4 px-6 text-center font-medium">Category Name</th>
                            <th className="py-4 px-6 text-center font-medium">Category Image</th>
                            <th className="py-4 px-6 text-center font-medium">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {category && category.map((index) => (
                            <tr key={index._id} className="border-b hover:bg-gray-50">
                                <td className="py-4 px-6 text-center text-gray-700">{index._id}</td>
                                <td className="py-4 px-6 text-center capitalize text-gray-700">{index.categoryName}</td>
                                <td className="py-4 px-6 flex items-center justify-center">
                                    <img src={BASE_URL + index.categoryImage} alt={index.categoryName} className="w-16 h-16 object-cover rounded-lg mx-auto" />
                                </td>
                                <td className="py-4 px-6 text-center space-x-4">
                                    <button className="text-blue-600 hover:text-blue-800 font-semibold transition duration-300" onClick={() => handleEdit(index._id)}>
                                        Edit
                                    </button>
                                    <button className="text-red-600 hover:text-red-800 font-semibold transition duration-300" onClick={() => handleDelete(index._id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal
                isOpen={openModal.isShown}
                onRequestClose={() => { }}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0,0,0,0.5)",
                    },
                }}
                contentLabel=''
                className='w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-auto'
            >
                {/* <CategoryModal type={openModal.type} data={openModal.data} onClose={() => { setOpenModal({ isShown: false, type: "add", data: null }) }} getAllCategories={getAllCategories} /> */}
                <CategoryModal
                    type={openModal.type}
                    categoryData={openModal.data}
                    onClose={() => setOpenModal({ isShown: false, type: "add", data: null })}
                    getAllCategories={getAllCategories}
                />
            </Modal>
        </>
    )
}

export default Categorieslist