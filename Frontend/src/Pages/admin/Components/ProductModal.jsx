import React, { useState, useEffect } from 'react'
import axiosInstance from '../../../Components/utils/axiosInstance'
import CloseIcon from '@mui/icons-material/Close';

const ProductModal = ({ onClose, getAllProducts, type, productData, filePath }) => {
    const [title, setTitle] = useState(productData?.title || "")
    const [category, setCategory] = useState(productData?.category || "")
    const [price, setPrice] = useState(productData?.price || 0)
    const [quantity, setQuantity] = useState(productData?.quantity || 0)
    const [descriptions, setDescriptions] = useState(productData?.descriptions || "")
    const [thumbnail, setThumbnail] = useState(productData?.thumbnail ? filePath + '/' + productData.thumbnail : null)
    const [author, setAuthor] = useState(productData?.author || "")
    const [error, setError] = useState(null)
    const [categoryData, setCategoryData] = useState([])

    const getAllCategory = async () => {
        try {
            const response = await axiosInstance.get('/getallcategory')
            setCategoryData(response.data.data)
            console.log(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log("Selected file:", file);
            setThumbnail(file);
        } else {
            console.warn("No file selected.");
        }
    }

    const addProductData = async () => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("category", category);
        formData.append("price", price);
        formData.append("quantity", quantity);
        formData.append("descriptions", descriptions);
        formData.append("thumbnail", thumbnail);
        formData.append("author", author);
        try {
            console.log("Submitting FormData:")
            formData.forEach((value, key) => console.log(key, value))

            const response = await axiosInstance.post('/createproduct'
                , formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })

            if (response.data && response.data.data) {
                console.log("Product added successfully:", response.data.data)
                getAllProducts();
                onClose();
            }
        } catch (error) {
            console.log("Error adding category:", error)
            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        }
    }

    const editProductData = async () => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("category", category);
        formData.append("price", price);
        formData.append("quantity", quantity);
        formData.append("descriptions", descriptions);
        formData.append("thumbnail", thumbnail);
        formData.append("author", author);

        try {
            const response = await axiosInstance.put(`/editproduct/${productData._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (response.data && response.data.data) {
                getAllProducts();
                onClose();
            }
        } catch (error) {
            setError(error.response?.data?.message || "An unexpected error occurred.");
        }
    }

    const addProduct = async () => {
        if (!title) {
            setError("Please enter product title");
            return;
        }
        if (!category) {
            setError("Please enter product category");
            return;
        }
        if (!price) {
            setError("Please enter product price");
            return;
        }
        if (!quantity) {
            setError("Please enter product quantity");
            return;
        }
        if (!descriptions) {
            setError("Please enter product description");
            return;
        }
        if (!thumbnail) {
            setError("Please select product thumbnail");
            return;
        }
        if (!author) {
            setError("Please enter product author");
            return;
        }
        setError("")
        if (type === "edit") {
            editProductData()
        } else {
            addProductData()
        }
    }

    useEffect(() => {
        getAllCategory()
    }, [])


    return (
        <div className='relative'>
            <button className='w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-white transition-all ease-in-out' onClick={onClose}>
                <CloseIcon className="text-xl text-red-700" />
            </button>
            <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                    <label className='text-sm font-medium'>Title</label>
                    <input className='text-2xl text-leather outline-none rounded' placeholder='Title' type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='text-sm font-medium'>Category</label>
                    <select
                        className='input-box'
                        value={category}
                        onChange={(e) => setCategory(e.target.value)} // Set category by value (category _id)
                    >
                        <option value="">Select Category</option>
                        {categoryData.map((category) => (
                            <option className='capitalize' key={category._id} value={category._id}>
                                {category.categoryName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='text-sm font-medium'>Price</label>
                    <input className='text-2xl text-leather outline-none rounded' placeholder='Price' type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='text-sm font-medium'>Quantity</label>
                    <input className='text-2xl text-leather outline-none rounded' type="number" value={quantity} placeholder='Quantity' onChange={(e) => setQuantity(e.target.value)} />
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='text-sm font-medium'>Description</label>
                    <input className='text-2xl text-leather outline-none rounded' type="text" placeholder='Description' value={descriptions} onChange={(e) => setDescriptions(e.target.value)} />
                </div>
                <div className='flex gap-2'>
                    <div>
                        <label className='text-sm font-medium'>Thumbnail</label>
                        <input className='input-box' type="file" onChange={handleFileChange} />
                    </div>
                    <div>
                        {
                            thumbnail ? <img src={thumbnail} width={100} height={100} alt="Thumbnail" /> : null
                        }
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='text-sm font-medium'>Author</label>
                    <input className='text-2xl text-leather outline-none rounded' placeholder='Author' type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
                </div>
                <div className='flex flex-col gap-2'>
                    {error && <p className='text-sm text-red-500'>{error}</p>}
                </div>
                <div className='flex flex-col gap-2'>
                    <button className='btn-primary' onClick={addProduct}>{type === "edit" ? "Update" : "ADD PRODUCT"}</button>
                </div>
            </div>
        </div>
    )
}

export default ProductModal