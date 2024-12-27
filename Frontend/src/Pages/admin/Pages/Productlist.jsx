import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import axiosInstance from '../../../Components/utils/axiosInstance'
import ProductModal from '../Components/ProductModal'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Productlist = () => {
    const [openModal, setOpenModal] = useState({
        isShown: false,
        type: 'add',
        data: null
    })
    const [deleteModal, setDeleteModal] = useState({
        isShown: false,
        categoryId: null,
    })
    const [product, setProduct] = useState([])
    const [filePath, setFilePath] = useState("")
    const [editProduct, setEditProduct] = useState(null)

    const getAllProducts = async () => {
        try {
            const response = await axiosInstance.get('/getallproduct');
            console.log(response.data.data)
            console.log(response.data.filePath)
            setProduct(response.data.data)
            setFilePath(response.data.filePath)
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    const handleDeleteProduct = async () => {
        try {
            const response = await axiosInstance.delete(`/deleteproductbyid/${deleteModal.productId}`)
            if (response.status === 200) {
                console.log(response.data.data)
                getAllProducts()
            }
        } catch (error) {
            console.error('Error deleting product:', error)
        } finally {
            setDeleteModal({ isShown: false, categoryId: null })
        }
    }

    const handleAddProduct = async () => {
        setOpenModal({
            isShown: true,
            type: 'add',
            data: null
        })
    }

    const confirmDelete = (productId) => {
        setDeleteModal({
            isShown: true,
            productId: productId
        })
    }

    const handleEditProduct = async (productId) => {
        const productData = product.find((item) => item._id === productId);
        setOpenModal({
            isShown: true,
            type: 'edit',
            data: productData,
            productId: productId
        })
        setEditProduct(productData)
    }

    useEffect(() => {
        getAllProducts()
    }, [])

    return (
        <>
            {/* <AdminNavbar /> */}
            <div className='flex justify-between items-center p-6'>
                <h1 className='text-3xl font-semibold text-gray-800'>Product List</h1>
                <button className='bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300' onClick={() => handleAddProduct()}>Add Product</button>
            </div>
            <div className='overflow-x-auto px-6'>
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                    <thead className="bg-gray-100">
                        <tr className="text-gray-600">
                            <th className="py-4 px-6 text-center font-medium">Sr no</th>
                            <th className="py-4 px-6 text-center font-medium">Product Title</th>
                            <th className="py-4 px-6 text-center font-medium">Product Category</th>
                            <th className="py-4 px-6 text-center font-medium">Product Price</th>
                            <th className="py-4 px-6 text-center font-medium">Product Quantity</th>
                            <th className="py-4 px-6 text-center font-medium">Product Description</th>
                            <th className="py-4 px-6 text-center font-medium">Product Thumbnail</th>
                            <th className="py-4 px-6 text-center font-medium">Product Author</th>
                            <th className="py-4 px-6 text-center font-medium">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            product && product.map((index, i) => {
                                return (
                                    <tr key={index._id} className='border-b hover:bg-gray-50'>
                                        <td className="py-4 px-6 text-center">{i + 1}</td>
                                        <td className='py-4 px-6 text-center'>
                                            {index.title}
                                        </td>
                                        <td className='py-4 px-6 text-center uppercase'>
                                            {index.category.categoryName}
                                        </td>
                                        <td className='py-4 px-6 text-center'>
                                            {index.price}
                                        </td>
                                        <td className='py-4 px-6 text-center'>
                                            {index.quantity}
                                        </td>
                                        <td className='py-4 px-6 text-center'>
                                            <div className='w-48 overflow-hidden text-ellipsis whitespace-nowrap'>
                                                {index.descriptions}
                                            </div>
                                        </td>
                                        <td className='py-4 px-6 text-center'>
                                            <img className='w-16 h-16 object-cover rounded-lg mx-auto' src={filePath + index.thumbnail} alt={index.title} />
                                        </td>
                                        <td className='py-4 px-6 text-center'>
                                            {index.author}
                                        </td>
                                        <td className='py-4 px-6 text-center flex flex-col gap-1'>
                                            <button className='bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300' onClick={() => handleEditProduct(index._id)}><EditIcon /></button>
                                            <button className='bg-red-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-700 transition duration-300' onClick={() => confirmDelete(index._id)}><DeleteIcon /></button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            {/* Add/Edit Product Modal */}
            <Modal
                isOpen={openModal.isShown}
                onRequestClose={() => { }}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }
                }}
                contentLabel=''
                className='w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-auto'
            >
                <ProductModal
                    type={openModal.type}
                    productData={openModal.data}
                    filePath={filePath}
                    onClose={() => setOpenModal({ isShown: false, type: 'add', data: null })}
                    getAllProducts={getAllProducts}
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
                        onClick={handleDeleteProduct}
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

export default Productlist