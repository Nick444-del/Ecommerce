import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PasswordInput from '../Components/Inputs/PasswordInput'
import { validateEmail } from '../Components/utils/helper'
import axiosInstance from '../Components/utils/axiosInstance'
import toast from 'react-hot-toast'

const Signup = () => {
    const [fullname, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [mobile, setMobile] = useState('')
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const handleSignUp = async (e) => {
        e.preventDefault();
        if (!fullname) {
            setError("Please enter your name");
            return;
        }
        if (!validateEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }
        if (!password) {
            setError("Please enter your password");
            return;
        }
        setError("")
        try {
            console.log(fullname)
            const response = await axiosInstance.post("/register", {
                fullname: fullname,
                email: email,
                mobile: mobile,
                password: password
            })
            console.log("Sign-up response: " + response)
            localStorage.setItem("register", JSON.stringify(response.data))
            if (response.data && response.data.error) {
                setError(response.data.message)
                return
            }
            if (response.data && response.data.token) {
                localStorage.setItem("token", response.data.token)
                navigate('/bookwormdenn/login')
                if (response.data.success) {
                    toast.success(response.data.message)
                }
            }
        } catch (error) {
            if (error.response.status && error.response.data && error.response.data.message) {
                setError(error.response.data.message)
                toast.error(error.response.data.message)
            } else {
                setError("An unexpected error occurred. Please try again later.")
            }
        }
    }

    return (
        <>
            <div className='flex items-center justify-center mt-28'>
                <div className='w-96 border rounded bg-apricot px-7 py-10'>
                    <form onSubmit={handleSignUp}>
                        <h4 className='text-2xl mb-7'>Sign Up</h4>

                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder='Name'
                            className='input-box my-3'
                            value={fullname}
                            onChange={(e) => setFullName(e.target.value)}
                        />

                        <input
                            type="text"
                            name="email"
                            id="email"
                            placeholder='Email'
                            className='input-box my-3'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input
                            type="text"
                            name="mobile"
                            id="mobile"
                            placeholder='Mobile Number'
                            className='input-box my-3'
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                        />

                        <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />

                        {error && <p className='text-red-600 text-xs pb-1'>{error}</p>}

                        <button type='submit' className=' btn-primary'>
                            Create Account
                        </button>

                        <p className='text-sm text-center mt-4'>Already a member? <Link to="/bookwormdenn/login" className="font-medium text-leather underline">Login</Link></p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup