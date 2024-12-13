import React, { useState, useEffect } from 'react'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import axiosInstance from '../Components/utils/axiosInstance'
import { NavLink } from 'react-router-dom'

const Collection = () => {
    const [categories, setCategories] = useState([])
    const [filepath, setFilepath] = useState("")
    const [loading, setLoading] = useState(false)

    const getCategories = async () => {
        try {
            const response = await axiosInstance.get("/getallcategory");
            if (response.data && response.data.data) {
                setCategories(response.data.data);
                setFilepath(response.data.filepath);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        getCategories();
    }, [])


    return (
        <>
            <div className='mx-[260px] px-[50px]'>
                <h1 className='text-[40px] my-[20px] font-bold'>Collection</h1>
                <div className="collection-gallery grid grid-cols-3 gap-4">
                    {
                        categories && categories.map((index) => {
                            return (
                                <div className='hover:cursor-pointer hover:' key={index._id}>
                                    <NavLink to={`/category/${index._id}`}>
                                        <img src={filepath + index.categoryImage} alt={index.categoryName} className='w-[297px] h-[374px] hover:scale-100' />
                                        <div className='p-[10px]'>
                                            <div className='px-[10px] py-[17px] flex flex-row items-center justify-start'>
                                                <h3 className='text-[#000000] text-[20px] uppercase font-bold'>{index.categoryName}</h3>
                                                <ArrowRightAltIcon />
                                            </div>
                                        </div>
                                    </NavLink>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Collection