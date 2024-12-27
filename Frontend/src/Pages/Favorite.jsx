import React, { useState, useEffect } from 'react'
import axiosInstance from '../Components/utils/axiosInstance'
import ProductCard from '../Components/ProductCard/ProductCard'

const Favorite = () => {
    const [favData, setFavData] = useState([])
    const [productData, setProductData] = useState([])
    const [filepath, setFilePath] = useState("")

    const getFavorites = async () => {
        try {
            const response = await axiosInstance.get('/getuserfav');
            const favoriteItems = response.data.data;
            console.log(response.data)
            const filepath = response.data.filepath || "http://localhost:5000/uploads"
            setFilePath(filepath)
            const productPromises = favoriteItems.map((fav) => 
                axiosInstance.get(`/getproductbyid/${fav.product}`) // Adjust the endpoint as needed
            );

            const products = await Promise.all(productPromises)

            setProductData(products.map((res) => res.data.data))
        } catch (error) {
            console.log("Error fetching favorites:", error.message);
        }
    }

    useEffect(() => {
        getFavorites()
    }, [])


    return (
        <div className='mx-[100px]'>
            <h1 className='text-[40px] my-[20px] font-bold'>Favorite</h1>
            <div className='grid grid-cols-4 my-3'>
                {
                    productData.map((product) => (
                        <ProductCard key={product._id} filepath={filepath} productTitle={product.title} productId={product._id} productImage={product.thumbnail} price={product.price} product={product} />
                    ))
                }
            </div>
        </div>
    )
}

export default Favorite