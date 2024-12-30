import React, { useState, useEffect, useRef } from 'react';
import { IoFingerPrint } from 'react-icons/io5';
import { FaChevronLeft } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import OtpTimer from '../Components/OtpTimer/OtpTimer';
import axiosInstance from '../Components/utils/axiosInstance';
import toast from 'react-hot-toast';

const VerifyOTP = () => {
    const navigate = useNavigate()
    const [otp, setOtp] = useState(Array(6).fill(''));
    const inputRefs = Array(6)
        .fill(0)
        .map(() => useRef(null));

    useEffect(() => {
        if (inputRefs[0].current) {
            inputRefs[0].current.focus();
        }
    }, []);

    const handleChange = (value, index) => {
        if (/^[0-9]?$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Move to the next input if a digit is entered
            if (value && index < 5) {
                inputRefs[index + 1].current.focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs[index - 1].current.focus();
        }
    };
    
    const otpSubmitHandler = async (e) => {
        e.preventDefault();
        const otpValue = otp.join('');
        console.log('Entered OTP:', otpValue);
        // Add your OTP verification logic here
        const response = await axiosInstance.post('/verifyotp', { otp: otpValue })
        if(response.data.success){
            console.log('OTP verified successfully');
            toast.success('OTP verified successfully')
            navigate('/bookwormdenn/newpassword')
        }
    };

    return (
        <div className='flex items-center justify-center my-28' style={{ height: '100%', backgroundImage: "url('/assets/images/loginbg.jpg')" }}>
            <div className='w-auto h-auto border rounded bg-apricot px-7 py-10'>
                <form onSubmit={otpSubmitHandler}>
                    <div className='flex flex-row items-center justify-center'>
                        <IoFingerPrint className='w-12 h-12 m-5' />
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <h4 className='text-2xl mb-7'>Verify OTP</h4>
                        <p>Enter the 6-digit OTP we just sent to your email</p>
                    </div>
                    <div className='auth_item'>
                        <label>OTP *</label>
                        <div className='flex items-center justify-center gap-2 my-2'>
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={inputRefs[index]}
                                    type='text'
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(e.target.value, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    className='ui_input otpverify flex justify-center items-center text-center w-10 h-10 text-xl border border-gray-300 rounded-md'
                                />
                            ))}
                        </div>
                    </div>
                    <div className='flex items-center justify-center my-[30px]'>
                        <button type='submit' className='btn-primary'>
                            Verify OTP
                        </button>
                    </div>
                    <OtpTimer />
                    <div className='mt-4'>
                        <NavLink to='/bookwormdenn/login'>
                            <button type='button' className='flex items-center justify-center'>
                                <FaChevronLeft className='mr-2' />
                                Back to Login
                            </button>
                        </NavLink>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VerifyOTP;
