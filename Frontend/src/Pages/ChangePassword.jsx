import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import PasswordInput from '../Components/Inputs/PasswordInput'
import { FaExchangeAlt } from "react-icons/fa";
import axiosInstance from '../Components/utils/axiosInstance'
import toast from 'react-hot-toast'

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [error, setError] = useState("")
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (!oldPassword) {
            setError("Password is required");
            return;
        }
        if (!newPassword) {
            setError("Password is required");
            return;
        }
        setError("")
        try {
            const response = await axiosInstance.put("/changepassword", {
                oldPassword,
                newPassword
            })
            if (response.data.success) {
                console.log("Password changed successfully");
                setSuccessMessage('Password changed successfully!');
                setOldPassword('');
                setNewPassword('');
                navigate("/bookwormdenn")
                toast.success(response.data.message || "Password changed successfully!", {
                    style: {
                        borderRadius: "10px",
                        background: "#000",
                        color: "#fff"
                    },
                    iconTheme: {
                        primary: '#fff',
                        secondary: '#000',
                    }
                })
            }
        } catch (error) {
            console.error("Error changing password:", error.response ? error.response.data : error.message);
            setError(error.response?.data?.message || 'An error occurred. Please try again.');
            toast.error(error.response?.data?.message || 'An error occurred. Please try again.', {
                style: {
                    borderRadius: "10px",
                    background: "#000",
                    color: "#fff"
                },
                iconTheme: {
                    primary: '#fff',
                    secondary: '#000',
                }
            });
        }
    }

    return (
        <div className='flex items-center justify-center mt-28 mb-28'>
            <div className='w-96 h-[100%] border rounded px-7 py-10'>
                <form onSubmit={handleChangePassword}>
                    <div className='flex flex-col items-center justify-between'>
                        <FaExchangeAlt className='w-12 h-12 m-5'/>
                        <h4 className='text-2xl mb-7'>Change Password</h4>
                    </div>
                    <PasswordInput value={oldPassword} placeholder={"Old Password"} onChange={(e) => setOldPassword(e.target.value)} />
                    <PasswordInput value={newPassword} placeholder={"New Password"} onChange={(e) => setNewPassword(e.target.value)} />
                    {error && <p className='text-red-600 text-xs pb-1'>{error}</p>}
                    {successMessage && <p className='text-green-600 text-xs pb-1'>{successMessage}</p>}
                    <button type='submit' className=' btn-primary'>
                        Change Password
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ChangePassword