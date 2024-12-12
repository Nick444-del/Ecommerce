import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logi1 from '../../../assets/images/logi1.png';
import PasswordInput from '../../../Components/Inputs/PasswordInput';
import { validateEmail } from '../../../Components/utils/helper';
import axiosInstance from '../../../Components/utils/axiosInstance';

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handlelogin = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }

        if (!password) {
            setError("Please enter your password");
            return;
        }

        setError("");

        try {
            const response = await axiosInstance.post("/adminlogin", { email, password });
            if (response.data && response.data.token) {
                localStorage.setItem("User", JSON.stringify(response.data.user));
                localStorage.setItem("token", response.data.token);
                navigate("/admin/dashboard");
            } else {
                setError("Access token missing in response data");
            }
        } catch (error) {
            console.error("Login error:", error);
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("An unexpected error occurred. Please try again");
            }
        }
    };

    return (
        <div className='flex items-center justify-center mt-28' style={{ height: "100%", backgroundImage: "url('/assets/images/loginbg.jpg')" }}>
            <div className='w-96 h-[340px] border rounded bg-apricot px-7 py-10'>
                <form onSubmit={handlelogin}>
                    <div className='flex flex-row items-center justify-between'>
                        <h4 className='text-2xl mb-7'>Admin Login</h4>
                        <NavLink to="/"><img src={logi1} className='w-12 h-12 m-5' alt="" /></NavLink>
                    </div>

                    <input 
                        type="text" 
                        name="email" 
                        id="email" 
                        placeholder='Email' 
                        className='input-box' 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />

                    <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />

                    {error && <p className='text-red-600 text-xs pb-1'>{error}</p>}

                    <button type='submit' className='btn-primary'>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
