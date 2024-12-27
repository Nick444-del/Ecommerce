import React, { useState, useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import axiosInstance from '../utils/axiosInstance';
import ProductCard from '../ProductCard/ProductCard';

const responsive = {
    0: { items: 1 },
    640: { items: 2 },
    1024: { items: 3 },
    1280: { items: 4 },
};

export const NewArrivals = () => {
    const [products, setProducts] = useState([]);
    const [filepath, setFilepath] = useState('');

    // Fetch New Arrivals
    const getNewArrivals = async () => {
        try {
            const response = await axiosInstance.get('/newarrivals');
            setProducts(response.data.data);
            setFilepath(response.data.filePath);
        } catch (error) {
            console.error('Error fetching new arrivals:', error);
        }
    };

    useEffect(() => {
        getNewArrivals();
    }, []);

    // Map products to ProductCard components
    const items = products.map((product) => (
        <div key={product._id} className="p-4 flex justify-center">
            <ProductCard
                filepath={filepath}
                productId={product._id}
                productImage={product.thumbnail}
                productTitle={product.title}
                price={product.price}
            />
        </div>
    ));

    return (
        <section className="py-10 bg-gray-50">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">New Arrivals</h2>
                <div className="relative flex justify-center">
                    <AliceCarousel
                        mouseTracking
                        items={items}
                        responsive={responsive}
                        controlsStrategy="alternate"
                        autoPlay
                        autoPlayInterval={3000}
                        infinite
                        disableDotsControls
                        disableButtonsControls={false}
                    />
                </div>
            </div>
        </section>
    );
};
