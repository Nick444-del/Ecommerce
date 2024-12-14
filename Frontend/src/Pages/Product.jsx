import React, { useEffect, useState } from 'react'
import axiosInstance from '../Components/utils/axiosInstance'
import ProductCard from '../Components/ProductCard/ProductCard'

const Product = () => {
    const [products, setProducts] = useState([])
    const [filepath, setFilepath] = useState("")

    const getAllProducts = async () => {
        try {
            const response = await axiosInstance('/getallproduct')
            setFilepath(response.data.filePath)
            console.log(response.data)
            setProducts(response.data.data)
        } catch (error) {
            console.error('Error fetching products:', error)
        }
    }

    useEffect(() => {
        getAllProducts()
    }, [])


    return (
        <>
            <div className='lg:mx-[260px] lg:px-[50px] sm:mx-auto sm:px-auto title'>
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
        </>
    )
}

export default Product