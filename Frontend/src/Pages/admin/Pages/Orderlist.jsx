import React, { useState, useEffect } from 'react';
import AdminNavbar from '../Components/AdminNavbar';
import axiosInstance from '../../../Components/utils/axiosInstance';

const Orderlist = () => {
    const [data, setData] = useState([]);
    const [filepath, setFilePath] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    // Fetch data with pagination
    const getData = async (page = 1) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/getallorders?page=${page}`);
            setData(response.data.data);
            setFilePath(response.data.filepath);
            setCurrentPage(response.data.currentPage);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData(currentPage);
    }, [currentPage]);

    // Handle page change
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <>
            {/* <AdminNavbar /> */}
            <h1 className='text-3xl font-semibold text-gray-800 mb-4'>Order List</h1>

            {loading ? (
                <div className="text-center py-4">Loading...</div>
            ) : (
                <>
                    <div className='overflow-x-auto'>
                        <table className='min-w-full bg-white border border-gray-200 shadow-md rounded-lg'>
                            <thead>
                                <tr className='bg-gray-100'>
                                    <th className='py-2 px-4 border-b'>User Name</th>
                                    <th className='py-2 px-4 border-b'>User Email</th>
                                    <th className='py-2 px-4 border-b'>Product Image</th>
                                    <th className='py-2 px-4 border-b'>Product Name</th>
                                    <th className='py-2 px-4 border-b'>Quantity</th>
                                    <th className='py-2 px-4 border-b'>Total Price</th>
                                    <th className='py-2 px-4 border-b'>Date & Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((order) => (
                                    <tr key={order._id} className='hover:bg-gray-50'>
                                        <td className='py-2 px-4 border-b text-center'>{order.userId.fullname}</td>
                                        <td className='py-2 px-4 border-b text-center'>{order.userId.email}</td>
                                        <td className='py-2 px-4 border-b text-center'>
                                            <img
                                                src={`${filepath}/${order.productId.thumbnail}`}
                                                alt={order.productId.title}
                                                className='w-16 h-16 object-cover rounded-md mx-auto'
                                            />
                                        </td>
                                        <td className='py-2 px-4 border-b text-center'>{order.productId.title}</td>
                                        <td className='py-2 px-4 border-b text-center'>{order.quantity}</td>
                                        <td className='py-2 px-4 border-b text-center'>
                                            ₹{order.productId.price * order.quantity + 50}
                                        </td>
                                        <td className='py-2 px-4 border-b text-center'>{order.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className='mt-4 flex justify-center'>
                        <nav className='flex items-center'>
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className='px-4 py-2 border rounded-l-lg bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50'
                            >
                                Prev
                            </button>
                            <span className='px-4 py-2 text-lg text-gray-700'>
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className='px-4 py-2 border rounded-r-lg bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50'
                            >
                                Next
                            </button>
                        </nav>
                    </div>
                </>
            )}
        </>
    );
};

export default Orderlist;
