import React from 'react'
import hero1 from '../assets/images/hero1.jpg'
import categoryData from '../Components/category'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { NavLink } from 'react-router-dom';

const Home = () => {
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
                    <div className='grid lg:grid-cols-5 gird-cols-2 gap-4 sm:grid-cols-3'>
                        {
                            categoryData.map((index) => {
                                return (
                                    <div className='hover:cursor-pointer' key={index.id}>
                                        <img src={index.image} alt={index.title} className='w-[177px] h-[177px] hover:scale-100' />
                                        <div className='p-[10px]'>
                                            <div className='px-[10px] py-[17px] flex flex-row items-center justify-start'>
                                                <h3 className='text-[#000000] text-[20px] uppercase font-bold'>{index.title}</h3>
                                                <ArrowRightAltIcon />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='flex items-center justify-center my-[15px]'>
                        <button className='w-[120px] transition-all duration-500 h-[45px] bg-black text-white hover:text-black hover:bg-white'>
                            <NavLink to="/collection" className='nav-link capitalize'>
                                view all
                            </NavLink>
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home