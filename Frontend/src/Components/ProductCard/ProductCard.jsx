import React from 'react'
import { BASE_URL } from '../utils/constant';


const ProductCard = ({ productImage, productTitle, price }) => {
    return (
        <div className='w-[100%]'>
            <img src={ BASE_URL + productImage} alt={productTitle} className='w-[100%] h-auto object-cover' />
            <p>{productTitle}</p>
            <p>Rs. {price}</p>
            <button className='w-[218px] h-[45px] border-[1px] border-black hover:border-white hover:bg-black hover:text-white transition-colors'>Add to Cart</button>
        </div>
    )
}

export default ProductCard