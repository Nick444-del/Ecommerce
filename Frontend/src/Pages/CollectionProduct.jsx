import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../Components/utils/axiosInstance';
import ProductCard from '../Components/ProductCard/ProductCard';

const CollectionProduct = () => {
    const { categoryId } = useParams(); // Extract categoryId from the URL
    const [products, setProducts] = useState([]);

    const getProductbyCategory = async () => {
        try {
            const response = await axiosInstance.get(`/getproductbycategory/${categoryId}`);
            setProducts(response.data.data);
        } catch (error) {
            console.error('Error fetching products:', error);
            console.log()
        }
    };

    useEffect(() => {
        if (categoryId) {
            getProductbyCategory();
        }
    }, [categoryId]);

    return (
        <>
            <div className='mx-[260px] px-[50px]'>
                <h1 className='my-[25px] text-[40px] font-medium'>Product</h1>
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
                <div className='px-[50px] grid grid-cols-4 gap-4 my-[40px]'>
                    {products.map((product) => (
                        <ProductCard key={product._id} productImage={product.thumbnail} productTitle={product.title} price={product.price} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default CollectionProduct;
