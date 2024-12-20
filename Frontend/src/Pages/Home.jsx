import React, { useState, useEffect } from 'react'
import hero1 from '../assets/images/hero1.jpg'
import categoryData from '../Components/category'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { NavLink } from 'react-router-dom';
import ProductCard from '../Components/ProductCard/ProductCard';
import axiosInstance from '../Components/utils/axiosInstance';
import MythologicalBanner from '../assets/images/banner1.jpg'

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
            <section className='self-help-section py-[36px]'>
                <div className='mx-[260px] mb-[25px] px-[50px]'>
                    <h1 className='mb-[30px] text-[40px] font-bold text-center'>Self-Help Collection</h1>
                    <div className='px-[50px]'>
                        <div className='mt-[16px] mb-[20px] grid grid-cols-5 gap-[230px]'>
                            {
                                selfhelp.map((index) => {
                                    return(
                                        <ProductCard key={index._id} filepath={filepath} productId={index._id} productImage={index.thumbnail} productTitle={index.title} price={index.price} />
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </section>
            <section className='Business-Startups py-[36px]'>
                <div className='mx-[260px] mb-[25px] px-[50px]'>
                    <h1 className='mb-[30px] text-[40px] font-bold text-center'>Business & Startups</h1>
                    <div className='px-[50px]'>
                        <div className='mt-[16px] mb-[20px] grid grid-cols-5 gap-[230px]'>
                            {
                                business.map((index) => {
                                    return(
                                        <ProductCard key={index._id} filepath={filepath} productId={index._id} productImage={index.thumbnail} productTitle={index.title} price={index.price} />
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className='w-100vw h-[755px]' style={{ backgroundImage: `url(${MythologicalBanner})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}></div>
                <div className='py-[12px]'>
                    <div className='mx-[260px] mb-[25px] px-[50px]'>
                        <h2 className='uppercase text-center text-[40px] font-bold mb-[30px]'>mythology</h2>
                        <div className='px-[50px]'>
                            <div className='pt-[16px] pb-[20px] grid grid-cols-4 gap-[100px]'>
                                {
                                    mythology && mythology.map((index) => {
                                        return(
                                            <ProductCard key={index._id} filepath={filepath} productId={index._id} productImage={index.thumbnail} productTitle={index.title} price={index.price} />
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className='pt-[36px] pb-[12px]'>
                    <div className='mx-[260px] px-[50px]'>
                        
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home