import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import PasswordInput from '../Components/Inputs/PasswordInput'
import { GrUpdate } from "react-icons/gr";
import axiosInstance from '../Components/utils/axiosInstance';

const NewPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate()

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (!password) {
            setError("Password is required");
            return;
        }

        if (!confirmPassword) {
            setError("Confirm Password is required");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setError("");
        console.log("Password changed" + password, confirmPassword);
        try {
            const response = await axiosInstance.put('/resetpassword', {
                // body: JSON.stringify({ password, confirmPassword })
                password, confirmPassword
            })

            if (response.data.success) {
                console.log("Password changed successfully");
                toast.success("Password changed successfully", {
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
                // setSuccessMessage('Password changed successfully!');
                setPassword('');
                setConfirmPassword('');
                navigate('/bookwormdenn/login')
                toast.success("Password changed successfully!")
            }
        } catch (error) {
            console.error("Error changing password:", error.response ? error.response.data : error.message);
            setError(error.response?.data?.message || 'An error occurred. Please try again.');
        }
    }

    return (
        <>
            <div className='flex items-center justify-center mt-28  ' style={{ height: "100%", backgroundImage: "url('/assets/images/loginbg.jpg')" }}>
                <div className='w-96 h-[100%] border rounded bg-apricot px-7 py-10'>
                    <form onSubmit={handleChangePassword}>
                        <div className='flex flex-col items-center justify-between my-4'>
                            <GrUpdate className='w-12 h-12 m-5' />
                            <h4 className='text-2xl mb-7'>Create New Password</h4>
                            <p className='text-sm text-center'>Your new password must be different from previously used passwords</p>
                        </div>
                        <label className='text-sm pb-1'>Enter New Password</label>
                        <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
                        <label className='text-sm pb-1'>Confirm New Password</label>
                        <PasswordInput value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        {error && <p className='text-red-600 text-xs pb-1'>{error}</p>}
                        <button type='submit' className=' btn-primary'>
                            Change Password
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default NewPassword