import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import PasswordInput from '../Components/Inputs/PasswordInput'
import logi1 from '../assets/images/logi1.png'
import axiosInstance from '../Components/utils/axiosInstance'

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
            }
        } catch (error) {
            console.error("Error changing password:", error.response ? error.response.data : error.message);
            setError(error.response?.data?.message || 'An error occurred. Please try again.');
        }
    }

    return (
        <div className='flex items-center justify-center mt-18 mb-28'>
            <div className='w-96 h-[340px] border rounded px-7 py-10'>
                <form onSubmit={handleChangePassword}>
                    <div className='flex flex-row items-center justify-between'>
                        <h4 className='text-2xl mb-7'>Change Password</h4>
                        <NavLink to="/bookwormdenn"><img src={logi1} className='w-12 h-12 m-5' alt="" /></NavLink>
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