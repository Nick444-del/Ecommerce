import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaSignOutAlt } from 'react-icons/fa';

// Custom Logout Toast Component
const LogoutToast = () => {
    return (
        <div className="flex items-center gap-4 p-3 bg-gray-800 text-white rounded-md shadow-lg">
            <FaSignOutAlt className="text-red-500 text-2xl" />
            <div>
                <p className="font-medium">Logged Out</p>
                <p className="text-sm text-gray-400">You have been successfully logged out.</p>
            </div>
        </div>
    );
};

// Trigger the Logout Toast
const showLogoutToast = () => {
    toast.custom((t) => (
        <div
            className={`${t.visible ? 'animate-enter' : 'animate-leave'
                } max-w-md w-full bg-gray-800 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
            <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                    <FaSignOutAlt className="text-red-500 text-2xl mr-3" />
                    <div className="ml-1">
                        <p className="text-sm font-medium text-white">Successfully Logged Out</p>
                        <p className="mt-1 text-sm text-gray-400">You have been logged out of your account.</p>
                    </div>
                </div>
            </div>
            <div className="flex border-l border-gray-200">
                <button
                    onClick={() => toast.dismiss(t.id)}
                    className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-red-400 hover:text-red-600 focus:outline-none"
                >
                    Close
                </button>
            </div>
        </div>
    ));
};

// Main Component
const LogoutButton = () => {
    return (
        <div className="p-5">
            <button
                onClick={showLogoutToast}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
                Logout
            </button>
            <Toaster position="top-right" />
        </div>
    );
};

export default LogoutButton;
