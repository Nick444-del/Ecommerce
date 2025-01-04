import React, { useEffect, useState } from 'react'
import axiosInstance from '../Components/utils/axiosInstance'
import ProductCard from '../Components/ProductCard/ProductCard'

const Product = () => {
    const [products, setProducts] = useState([])
    const [filepath, setFilepath] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [loading, setLoading] = useState(false)


    const getAllProducts = async (page = 1) => {
        setLoading(true)
        try {
            const response = await axiosInstance(`/getallproduct?page=${page}`)
            setFilepath(response.data.filePath)
            console.log(response.data)
            setProducts(response.data.data)
            setTotalPages(response.data.totalPages)
            setCurrentPage(response.data.currentPage)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching products:', error)
        }
    }

    useEffect(() => {
        getAllProducts(currentPage)
    }, [currentPage])

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <>
            <div className='lg:mx-[100px] lg:px-[50px] sm:mx-auto sm:px-auto title'>
                <h1 className='my-[25px] text-[40px] md:text-center font-bold'>Product's</h1>
                <div className='flex justify-between'>
                    <div className='flex gap-3'>
                        <span>Filter</span>
                        <span>Availability</span>
                        <span>Price</span>
                    </div>
                    <div className='flex gap-3'>
                        <span>Sort by:</span>
                        <span>Date, new to old</span>
                        <span>{products.length} products</span>
                    </div>
                </div>
                <div className='grid lg:grid-cols-4 gap-4 items-center justify-center md:grid-cols-3 sm:grid-cols-2 my-[50px]'>
                    {
                        products.map((product) => {
                            return (
                                <ProductCard filepath={filepath} product={product} key={product._id} productId={product._id} productImage={product.thumbnail} productTitle={product.title} price={product.price} />
                            )
                        })
                    }
                </div>
            </div>
            <div className='mt-4 flex justify-center'>
                <nav className='flex items-center'>
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className='px-4 py-2 border rounded-l-lg bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50'
                    >
                        Prev
                    </button>
                    <span className='px-4 py-2 text-lg text-gray-700'>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className='px-4 py-2 border rounded-r-lg bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50'
                    >
                        Next
                    </button>
                </nav>
            </div>
        </>
    )
}

export default Product