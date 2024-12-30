import React, { useState, useEffect } from 'react'
import hero1 from '../assets/images/hero1.jpg'
import categoryData from '../Components/category'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { NavLink } from 'react-router-dom';
import { NewArrivals } from '../Components/Carousel/NewArrivals';
import ProductCard from '../Components/ProductCard/ProductCard';
import axiosInstance from '../Components/utils/axiosInstance';
import MythologicalBanner from '../assets/images/banner1.jpg'
import selfhelpBanner from '../assets/images/banner2.webp';
import businessBanner from '../assets/images/banner3.webp';

const Home = ({ getUserInfo }) => {
    const [selfhelp, setSelfhelp] = useState([])
    const [business, setBusiness] = useState([])
    const [manga, setManga] = useState([])
    const [mythology, setMythology] = useState([])
    const [filepath, setFilepath] = useState("")

    const getData = async () => {
        try {
            const selfhelpResponse = await axiosInstance.get('/getallselfhelp')
            const businessResponse = await axiosInstance.get('/getbusiness')
            const mangaResponse = await axiosInstance.get('/getmanga')
            const mythologyResponse = await axiosInstance.get('/mythologicbook')
            setManga(mangaResponse.data.data)
            setSelfhelp(selfhelpResponse.data.data)
            setBusiness(businessResponse.data.data)
            setFilepath(selfhelpResponse.data.filepath)
            setMythology(mythologyResponse.data.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getUserInfo()
        getData()
    }, [])


    return (
        <div>
            <section>
                <img src={hero1} alt="" className='w-full h-auto object-cover' />
            </section>
            <section className='offers py-[35px]'>
                <div className='flex justify-center sm:mx-auto items-center'>
                    {/* mx-[260px] px-[50px]  */}
                    <div className='w-[900px] h-[235px]'>
                        <div className='bg-gray-200 rounded-lg p-6 lg:p-8'>
                            <h3 className='text-lg lg:text-xl text-[#242833] font-bold uppercase mb-4'>offers!</h3>
                            <ul className='flex items-start align-top list-none flex-col gap-2 font-bold'>
                                <li>
                                    * 10% OFF ABOVE Rs 600/-
                                </li>
                                <li>
                                    * 12%OFF ABOVE Rs 1200/-
                                </li>
                                <li>
                                    * 12%OFF ABOVE Rs 1200/-
                                </li>
                                <li>
                                    * 18%OFF ABOVE Rs 2500/-
                                </li>
                                <li>
                                    * 18%OFF ABOVE Rs 2500/-
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <NewArrivals />
            </section>
            <section className='section3 flex items-center justify-center pt-[16px] pb-[24px] px-[50px]'>
                <div className='mb-[30px]'>
                    <div className='flex items-center justify-center'>
                        <h1 className='text-3xl lg:text-4xl text-black uppercase italic font-bold mb-8'>
                            view by categories...
                        </h1>
                    </div>
                    <div className='grid lg:grid-cols-5 gird-cols-2 gap-4 items-center justify-center sm:grid-cols-3'>
                        {
                            categoryData.map((index) => {
                                return (
                                    <NavLink key={index.id} className="nav-link" to={`/category/${index._id}`}>
                                        <div className='hover:cursor-pointer' key={index.id}>
                                            <img src={index.image} alt={index.title} className='w-[297px] h-[374px] hover:scale-100' />
                                            <div className='p-[10px]'>
                                                <div className='px-[10px] py-[17px] flex flex-row items-center justify-start'>
                                                    <h3 className='text-[#000000] text-[20px] uppercase font-bold'>{index.title}</h3>
                                                    <ArrowRightAltIcon />
                                                </div>
                                            </div>
                                        </div>
                                    </NavLink>
                                )
                            })
                        }
                    </div>
                    <div className='flex items-center justify-center my-[15px]'>
                        <button className='w-[120px] transition-all duration-500 h-[45px] bg-black text-white hover:text-black hover:bg-white'>
                            <NavLink to="/bookwormdenn/collection" className='nav-link capitalize'>
                                view all
                            </NavLink>
                        </button>
                    </div>
                </div>
            </section>
            <section className='self-help-section py-9 bg-gray-50'>
                <div
                    className='w-full h-[755px] bg-cover bg-center my-[30px] bg-no-repeat'
                    style={{ backgroundImage: `url(${selfhelpBanner})` }}
                ></div>
                <div className='container mx-auto px-4'>
                    <h1 className='mb-8 text-3xl md:text-4xl font-bold text-center text-gray-800'>Self-Help Collection</h1>
                    <div className='flex justify-center'>
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                            {selfhelp.map((index) => (
                                <ProductCard
                                    key={index._id}
                                    filepath={filepath}
                                    productId={index._id}
                                    productImage={index.thumbnail}
                                    productTitle={index.title}
                                    price={index.price}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>


            <section className='Business-Startups py-9 bg-gray-50'>
                <div
                    className='w-full h-[755px] bg-cover bg-center my-[30px] bg-no-repeat'
                    style={{ backgroundImage: `url(${businessBanner})` }}
                ></div>
                <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
                    {/* Section Title */}
                    <h1 className='mb-8 text-3xl sm:text-4xl font-bold text-center text-gray-800'>
                        Business & Startups
                    </h1>

                    {/* Product Grid */}
                    <div className='flex justify-center'>
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                            {business.map((product) => (
                                <ProductCard
                                    key={product._id}
                                    filepath={filepath}
                                    productId={product._id}
                                    productImage={product.thumbnail}
                                    productTitle={product.title}
                                    price={product.price}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section>
                {/* Background Section */}
                <div
                    className='w-full h-[755px] bg-cover bg-center bg-no-repeat'
                    style={{ backgroundImage: `url(${MythologicalBanner})` }}
                ></div>

                {/* Content Section */}
                <div className='py-4'>
                    <div className='container mx-auto px-4'>
                        {/* Title */}
                        <h2 className='uppercase text-center text-3xl md:text-4xl font-bold mb-8 text-gray-800'>Mythology</h2>

                        {/* Card Grid */}
                        <div className='flex justify-center'>
                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                                {mythology && mythology.map((product) => (
                                    <div key={product._id} className='flex justify-center'>
                                        <ProductCard
                                            filepath={filepath}
                                            productId={product._id}
                                            productImage={product.thumbnail}
                                            productTitle={product.title}
                                            price={product.price}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Home