import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import axiosInstance from '../../../Components/utils/axiosInstance';

const CategoryModal = ({ onClose, getAllCategories, type, filepath, categoryData }) => {
    const [categoryName, setCategoryName] = useState(categoryData?.categoryName || "");
    const [categoryImage, setCategoryImage] = useState( categoryData?.categoryImage ? filepath + '/' + categoryData.categoryImage : null );
    const [categoryFile, setCategoryFile] = useState(null)
    const [error, setError] = useState(null);
    console.log('categoryData', categoryData)
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log("Selected file:", file); // Debugging log
            setCategoryFile(file)
            setCategoryImage(URL.createObjectURL(file));
        } else {
            console.warn("No file selected."); // Debugging log
        }
    };


    const addCategory = async () => {
        setCategoryName("")
        setCategoryImage(null)
        if (!categoryName) {
            setError("Please enter category name");
            return;
        }
        if (!categoryFile) {
            setError("Please select category image");
            return;
        }
        const formData = new FormData();
        formData.append("categoryName", categoryName);
        formData.append("categoryImage", categoryFile); // Use the actual file
        try {
            console.log("Submitting FormData:"); // Debugging log
            formData.forEach((value, key) => console.log(key, value)); // Log FormData contents
            const response = await axiosInstance.post('/createCategory', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.data && response.data.data) {
                console.log("Category added successfully:", response.data.data); // Debugging log
                getAllCategories();
                onClose();
            }
        } catch (error) {
            console.error("Error adding category:", error); // Debugging log
            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        }
    };    

    const editCategory = async () => {
        const formData = new FormData();
        formData.append("categoryName", categoryName);
        if (categoryFile) {
            formData.append("categoryImage", categoryFile); // Use the actual file
        }
        try {
            console.log(categoryData._id);
            const response = await axiosInstance.put(`/updateCategory/${categoryData._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.data && response.data.success) {
                console.log("Category updated successfully:", response.data);
                getAllCategories();
                onClose();
            }
        } catch (error) {
            console.error("Error updating category:", error);
            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else {
                setError("An error occurred while updating the category.");
            }
        }
    }

    const handleAddCategory = () => {
        if (!categoryName) {
            setError("Please enter category name");
            return;
        }
        if (!categoryImage) {
            setError("Please select category image");
            return;
        }
        setError("")
        if (type === "edit") {
            editCategory()
        } else {
            addCategory()
        }
    }
console.log(categoryImage)
    return (
        <>
            <div className="relative">
                <button
                    className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-white transition-all ease-in-out"
                    onClick={onClose}
                >
                    <CloseIcon className="text-xl text-red-700" />
                </button>
                <div className="flex flex-col gap-2">
                    <label className="input-label my-3">Category Name</label>
                    <input
                        type="text"
                        className="text-2xl text-leather outline-none rounded"
                        placeholder="Category Name"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-2 my-3">
                    <label className="input-label">Category Image</label>
                    <input
                        type="file"
                        className="input-box"
                        onChange={handleFileChange}
                    />
                </div>
                <div>
                    {
                        categoryImage ? <img src={categoryImage} width={100} height={100} /> : null
                    }
                </div>
                {error && <p className='text-sm text-red-600'>{error}</p>}
                <button className='btn-primary font-medium my-1 p-3' onClick={handleAddCategory}>
                    {/* Submit */}
                    {type === "edit" ? "Update" : "Submit"}
                </button>
            </div>
        </>
    );
};

export default CategoryModal;
