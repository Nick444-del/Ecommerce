import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import AdminNavbar2 from './AdminNavbar2';
import logi1 from '../../../assets/images/logi1.png';
import { NavLink } from 'react-router-dom';
import routes from '../routes';

const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex w-full">
            {/* Sidebar */}
            <div
                className={`flex flex-col ${isOpen ? 'w-64' : 'w-16'
                    } bg-gray-800 text-white fixed h-full transition-all duration-300 shadow-lg`}
            >
                {/* Top Section */}
                <div className="flex justify-between items-center p-4">
                    {isOpen && (
                        <img src={logi1} alt="Logo" className="w-36" />
                    )}
                    <button
                        onClick={toggleSidebar}
                        className="text-white text-2xl hover:text-gray-400 transition-transform duration-300"
                    >
                        <FaBars />
                    </button>
                </div>

                {/* Sidebar Menu */}
                <div className="mt-6 flex flex-col space-y-4 overflow-y-auto">
                    {routes.map((route, index) => (
                        <SidebarItem key={index} {...route} isOpen={isOpen} />
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div
                className={`flex-1 transition-all duration-300 ${isOpen ? 'pl-64' : 'pl-16'
                    }`}
            >
                <AdminNavbar2 isOpen={isOpen} />
                <div className="p-5 h-screen bg-gray-100 pt-[80px] overflow-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};

// Sidebar Item Component
const SidebarItem = ({ icon, hasChild, children, label, isOpen, url }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div>
            {hasChild ? (
                <div>
                    <div
                        className="flex items-center px-4 py-2 rounded-md hover:bg-gray-700 cursor-pointer"
                        onClick={handleToggle}
                    >
                        <div className="text-xl">{icon}</div>
                        <span
                            className={`ml-4 ${isOpen ? 'block' : 'hidden'
                                } text-sm`}
                        >
                            {label}
                        </span>
                    </div>

                    {isDropdownOpen && isOpen && (
                        <ul className="ml-8 mt-2 space-y-2">
                            {children?.map((child, ind) => (
                                <li key={ind}>
                                    <NavLink
                                        to={child.url}
                                        className="block px-4 py-1 text-sm text-gray-300 hover:bg-gray-600 rounded-md"
                                    >
                                        {child.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ) : (
                <NavLink to={url}>
                    <div className="flex items-center px-4 py-2 rounded-md hover:bg-gray-700 cursor-pointer">
                        <div className="text-xl">{icon}</div>
                        <span
                            className={`ml-4 ${isOpen ? 'block' : 'hidden'
                                } text-sm`}
                        >
                            {label}
                        </span>
                    </div>
                </NavLink>
            )}
        </div>
    );
};

export default Sidebar;
