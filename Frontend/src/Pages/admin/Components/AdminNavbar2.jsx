import React, { useState } from 'react';
import { FaSearch, FaUserCircle, FaSignOutAlt, FaKey, FaUser } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutToast';

const Appbar = ({ isOpen }) => {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const navigate = useNavigate()

    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };

    const handleLogout = () => {
        toast.success("Logged out successfully!")
        localStorage.clear()
        localStorage.removeItem("token")
        navigate('/bookwormdenn/login')
    }

    return (
        <div
            className={`bg-gray-800 text-white px-4 py-3 flex items-center justify-end gap-6 fixed right-0 top-0 shadow-md z-50 ${isOpen ? 'left-64' : 'left-16'
                } transition-all duration-300`}
        >
            <h1 className='text-2xl font-bold'>BookWormDenn</h1>
            {/* Search Bar */}
            <div className="flex items-center space-x-2 border border-gray-600 rounded-md p-2 w-1/3 bg-gray-700 focus-within:ring-2 focus-within:ring-blue-500">
                <FaSearch className="text-gray-300" />
                <input
                    type="text"
                    placeholder="Search..."
                    className="bg-transparent outline-none text-white placeholder-gray-400 w-full"
                />
            </div>

            {/* User Menu Icon */}
            <div className="relative">
                <button
                    onClick={toggleUserMenu}
                    className="text-white text-2xl hover:text-blue-400 transition-transform transform hover:scale-110 active:scale-100"
                >
                    <FaUserCircle />
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 bg-gray-700 text-white rounded-md shadow-lg w-48 overflow-hidden">
                        <ul className="space-y-2 p-3">
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center space-x-2 hover:bg-gray-600 px-3 py-2 rounded-md transition"
                                >
                                    <FaUser className="text-lg" />
                                    <span>Profile</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center space-x-2 hover:bg-gray-600 px-3 py-2 rounded-md transition"
                                >
                                    <FaKey className="text-lg" />
                                    <span>Reset Password</span>
                                </a>
                            </li>
                            <li onClick={handleLogout}>
                                <a
                                    href="#"
                                    className="flex items-center space-x-2 hover:bg-gray-600 px-3 py-2 rounded-md transition"
                                >
                                    <FaSignOutAlt className="text-lg" />
                                    <span>Logout</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Appbar;
