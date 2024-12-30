import React, { useState, useEffect } from 'react'
import axiosInstance from '../Components/utils/axiosInstance'
import { MdOutlineAttachEmail } from "react-icons/md";
import { validateEmail } from '../Components/utils/helper'
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'

const ForgetPasswordEmail = (e) => {
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const navigate = useNavigate()

    const handleEmailVerify = async (e) => {
        e.preventDefault();
        console.log("Forget password function triggered");
        // Validate email format
        if (!validateEmail(email)) {
            setError("Please enter a valid email address");
            console.log("Invalid email format");
            return;
        }
        setError(""); // Clear previous errors
        try {
            // Send the email to the backend
            const response = await axiosInstance.post("/forgetpassword", { email });
            console.log("Forget password response: ", response);
            if (response.data.success) {
                setSuccess("OTP sent successfully to your email.");
                navigate("/bookwormdenn/verifyotp")
                toast.success(success)
            } else {
                setError(response.data.error || "Failed to send OTP");
            }
        } catch (error) {
            console.error("Error: ", error);
            if (error.response) {
                setError(error.response.data.error || "An error occurred while sending the OTP.");
            } else {
                setError("Network error. Please try again later.");
            }
        }
    };
    

    return (
        <>
            <div className='flex items-center justify-center my-28  ' style={{ height: "100%", backgroundImage: "url('/assets/images/loginbg.jpg')" }}>
                <div className='w-96 h-[100%] border rounded bg-apricot px-7 py-10'>
                    <form onSubmit={handleEmailVerify}>
                        <div className='flex flex-col items-center justify-between'>
                            <MdOutlineAttachEmail className='w-12 h-12'/>
                            <h4 className='text-2xl mb-7'>Forget Password</h4>
                        </div>
                        <input type="text" name="email" id="email" placeholder='Email' className='input-box' value={email} onChange={(e) => setEmail(e.target.value)} />
                        {error && <p className='text-red-500 text-sm'>{error}</p>}
                        <div className='flex items-center justify-center my-[30px]'>
                            <button type='submit' className='btn-primary'>
                                Send OTP
                            </button>
                        </div>
                        <div className='flex items-center justify-center my-[30px]'>
                            <button type='submit' className='flex items-center justify-center rounded bg-white text-black hover:bg-black hover:text-white transition-all py-2 px-4' onClick={() => navigate('/bookwormdenn/login')}>
                                <FaChevronLeft /> Back to Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ForgetPasswordEmail