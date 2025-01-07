import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'

const PasswordInput = ({ value, onChange, placeholder }) => {
    const [isShownPassword, setIsShownPassword] = useState(false);

    const toggleShowPassword = () => {
        setIsShownPassword(!isShownPassword)
    }

    return (
        <div className='flex items-center bg-transparent border-[1.5px] px-5 rounded md-3 my-3 bg-vista_blue text-leather'>
            <input type={isShownPassword ? "text" : "password"} onChange={onChange} value={value} placeholder={placeholder || "Password"} className='w-full text-sm bg-transparent py-3 mr-3 rounded outline-none ' />

            {isShownPassword ? <FaRegEye size={22} onClick={() => toggleShowPassword()} className='text-leather cursor-pointer text-md' /> : <FaRegEyeSlash size={22} onClick={() => toggleShowPassword()} className='text-light_tan cursor-pointer text-md' />}
        </div>
    )
}

export default PasswordInput