import React from 'react'
import { BASE_URL } from '../utils/constant';


const ProductCard = ({ productImage, productTitle, price }) => {
    return (
        <div>
            <img src={ BASE_URL + productImage} alt={productTitle} className='w-[218px] h-[218px] object-cover' />
            <p>{productTitle}</p>
            <p>Rs. {price}</p>
            <button className='w-[218px] h-[45px] border-[1px] border-black '>Add to Cart</button>
        </div>
    )
}

export default ProductCard