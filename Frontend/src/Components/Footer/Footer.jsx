import React from 'react'
import footer1 from '../../assets/images/footer1.png'
import { FaLongArrowAltRight } from "react-icons/fa";

const Footer = () => {
    return (
        <>
            <footer className='bg-black text-white pt-6 pb-4'>
                {/* Container for the footer content */}
                <div className='container mx-auto px-4 lg:px-32 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                    {/* Quick Links Section */}
                    <div className="list1">
                        <h2 className='mb-4 font-bold text-lg'>Quick Links</h2>
                        <ul className='list-none space-y-2'>
                            <li className='hover:underline cursor-pointer'>Home</li>
                            <li className='hover:underline cursor-pointer'>Search</li>
                            <li className='hover:underline cursor-pointer'>Contact Information</li>
                            <li className='hover:underline cursor-pointer'>Checkout</li>
                        </ul>
                    </div>

                    {/* Policies Section */}
                    <div className="list2">
                        <h2 className='mb-4 font-bold text-lg'>Policies</h2>
                        <ul className='list-none space-y-2'>
                            <li className='hover:underline cursor-pointer'>Privacy Policy</li>
                            <li className='hover:underline cursor-pointer'>Refund Policy</li>
                            <li className='hover:underline cursor-pointer'>Terms of Service</li>
                        </ul>
                    </div>

                    {/* About the Shop Section */}
                    <div className='list3'>
                        <h2 className='mb-4 font-bold text-lg uppercase'>About the Shop</h2>
                        <p className='text-sm leading-6'>
                            Welcome to Bookwormsdenn, your ultimate destination for all kinds of books! We are passionate book lovers dedicated to connecting readers with a diverse selection of books, from bestsellers to hidden gems. Our curated collection spans various genres, ensuring there's something for everyone.
                        </p>
                    </div>

                    {/* Image Section */}
                    <div className='list4 flex items-center justify-center'>
                        <img src={footer1} alt="footer" className='w-32 h-32 object-cover rounded-lg' />
                    </div>
                </div>

                {/* Email Subscription Section */}
                <div className='mt-8 flex justify-center'>
                    <div className='relative w-full max-w-md'>
                        <input 
                            type="text" 
                            className='w-full py-3 px-4 bg-black border border-white rounded-sm placeholder-gray-400 text-white'
                            placeholder='Enter your email'
                        />
                        <button className='absolute right-0 top-0 bottom-0 bg-white text-black p-3 flex items-center justify-center rounded-sm'>
                            <FaLongArrowAltRight className='text-black' />
                        </button>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;
