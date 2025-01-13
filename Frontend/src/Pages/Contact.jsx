import React, { useState } from 'react';
import axiosInstance from '../Components/utils/axiosInstance'
import toast from 'react-hot-toast';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [comment, setComment] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        setIsLoading(true); // Indicate loading state

        // Validation
        if (!name || !email || !comment) {
            toast.error('Name, Email, and Comment are required fields.', {
                style: {
                    borderRadius: "10px",
                    background: "#000",
                    color: "#fff"
                },
                iconTheme: {
                    primary: '#fff',
                    secondary: '#000',
                }
            });
            setIsLoading(false);
            return;
        }

        try {
            const response = await axiosInstance.post('/api/contact', {
                name,
                email,
                phone,
                comment,
            });
            console.log(response);
            toast.success('Message sent successfully!', {
                style: {
                    borderRadius: "10px",
                    background: "#000",
                    color: "#fff"
                },
                iconTheme: {
                    primary: '#fff',
                    secondary: '#000',
                }
            });
            // Clear form fields after successful submission
            setName('');
            setEmail('');
            setPhone('');
            setComment('');
        } catch (error) {
            console.error('Error:', error.message || error.response.data.message);
            toast.error('Failed to send message. Please try again later.', {
                style: {
                    borderRadius: "10px",
                    background: "#000",
                    color: "#fff"
                },
                iconTheme: {
                    primary: '#fff',
                    secondary: '#000',
                }
            }
            );
        } finally {
            setIsLoading(false); // End loading state
        }
    };

    return (
        <div className='title lg:mx-[400px] lg:py-[36px] mx-[10px] py-[5px]'>
            <h1 className='text-[52px] font-bold mb-[40px]'>Contact</h1>
            <form
                onSubmit={handleSend}
                className='lg:mx-[40px] lg:py-[36px] mx-[10px] py-auto'
            >
                <div className='flex gap-[20px]'>
                    <input
                        className='mb-[20px] p-[15px] border-[2px] border-black w-full h-[45px]'
                        type='text'
                        placeholder='Name *'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        className='mb-[20px] p-[15px] border-[2px] border-black w-full h-[45px]'
                        type='email'
                        placeholder='Email *'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='flex'>
                    <input
                        className='mb-[20px] p-[15px] border-[2px] border-black w-full h-[45px]'
                        type='tel'
                        placeholder='Phone Number'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className='flex mb-[20px]'>
                    <textarea
                        className='w-full h-[100px] border-[2px] border-black p-[15px]'
                        placeholder='Comment *'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                </div>
                <button
                    type='submit'
                    disabled={isLoading}
                    className={`w-[120px] h-[45px] ${isLoading
                        ? 'bg-gray-500 cursor-not-allowed'
                        : 'bg-black hover:bg-white hover:text-black transition-colors'
                        } text-white`}
                >
                    {isLoading ? 'Sending...' : 'Send'}
                </button>
            </form>
        </div>
    );
};

export default Contact;
