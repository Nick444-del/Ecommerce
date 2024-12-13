import React, { useState, useEffect } from 'react'
import Dashboard from '../Components/Dashboard'
import axiosInstance from '../../../Components/utils/axiosInstance'
import { BASE_URL } from '../../../Components/utils/constant'

const Categorieslist = () => {
    const [category, setCategory] = useState([])

    const getAllCategories = async () => {
        const response = await axiosInstance.get('/getallcategory');
        console.log(response.data.data)
        setCategory(response.data.data)
    }

    const handleAddCategory = () => {

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
                            <th className="py-4 px-6 text-left font-medium">Id</th>
                            <th className="py-4 px-6 text-left font-medium">Category Name</th>
                            <th className="py-4 px-6 text-left font-medium">Category Image</th>
                            <th className="py-4 px-6 text-center font-medium">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {category && category.map((index) => (
                            <tr key={index._id} className="border-b hover:bg-gray-50">
                                <td className="py-4 px-6 text-gray-700">{index._id}</td>
                                <td className="py-4 px-6 capitalize text-gray-700">{index.categoryName}</td>
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
        </>
    )
}

export default Categorieslist