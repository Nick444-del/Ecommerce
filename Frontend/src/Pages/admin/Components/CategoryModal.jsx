import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import axiosInstance from '../../../Components/utils/axiosInstance';

const CategoryModal = ({ onClose, getAllCategories, type, categoryData }) => {
    const [categoryName, setCategoryName] = useState(categoryData?.name || "");
    const [categoryImage, setCategoryImage] = useState(null);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log("Selected file:", file); // Debugging log
            setCategoryImage(file);
        } else {
            console.warn("No file selected."); // Debugging log
        }
    };

    const addCategory = async () => {
        if (!categoryName) {
            setError("Please enter category name");
            return;
        }

        if (!categoryImage) {
            setError("Please select category image");
            return;
        }

        const formData = new FormData();
        formData.append("categoryName", categoryName);
        formData.append("categoryImage", categoryImage);

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
        if (categoryImage) {
            formData.append("categoryImage", categoryImage);
        }

        try {
            const response = await axiosInstance.put(`/updateCategory/${categoryData.id}`, formData);
            if (response.data && response.data.data) {
                getAllCategories();
                onClose();
            }
        } catch (error) {
            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else {
                setError("An error occurred while updating the category.");
            }
        }
    };

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
                        className="text-2xl text-leather outline-none rounded bg-apricot"
                        placeholder="Enter Title"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-2 my-3">
                    <label className="input-label">Category Image</label>
                    <input
                        type="file"
                        className="text-2xl text-leather outline-none rounded bg-apricot"
                        onChange={handleFileChange}
                    />
                </div>
                {error && <p className='text-sm text-red-600'>{error}</p>}
                <button className='btn-primary font-medium my-1 p-3' onClick={handleAddCategory}>
                    Submit
                </button>
            </div>
        </>
    );
};

export default CategoryModal;
