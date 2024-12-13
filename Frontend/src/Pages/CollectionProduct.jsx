import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../Components/utils/axiosInstance';
import ProductCard from '../Components/ProductCard/ProductCard';

const CollectionProduct = () => {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [filepath, setFilepath] = useState([]);
    const [category, setCategory] = useState([]);

    const getProductbyCategory = async () => {
        try {
            const response = await axiosInstance.get(`/getproductbycategory/${categoryId}`);
            setProducts(response.data.data);
            console.log(response.data.filepath);
            setFilepath(response.data.filepath);
            const categoryResponse = await axiosInstance.get(`/getcategorybyid/${categoryId}`);
            setCategory(categoryResponse.data.data);
            console.log(categoryResponse.data.data);
            console.log(category)
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    useEffect(() => {
        if (categoryId) {
            getProductbyCategory();
        }
    }, [categoryId]);

    return (
        <>
            <div className='lg:mx-[260px] lg:px-[50px] sm:mx-auto sm:px-auto'>
                <h1 className='my-[25px] text-[40px] capitalize font-bold'>{
                    category && category.map((index) => {
                        return (
                            index.categoryName
                        )
                    })
                }</h1>
                <div className='flex justify-between sm:flex-col lg:flex-row'>
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
                <div className="px-4 sm:px-6 lg:px-10 xl:px-14 my-12">
                    <div className='grid lg:grid-cols-4 lg:gap-[140px] md:gap-[100px] sm:gap-[50px] items-center justify-center md:grid-cols-3 sm:grid-cols-2 my-[50px]'>
                        {
                            products.map((product) => {
                                return (
                                    <ProductCard
                                    filepath={filepath}
                                    product={product} 
                                    key={product._id} 
                                    productId={product._id} 
                                    productImage={product.thumbnail} 
                                    productTitle={product.title} 
                                    price={product.price} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default CollectionProduct;
