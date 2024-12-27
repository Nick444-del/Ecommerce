import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import axiosInstance from '../utils/axiosInstance'
import { useNavigation } from 'react-router-dom'


const NewAddress = ({ isOpen, onClose, fetchAddresses }) => {
    const [fullname, setFullname] = useState("");
    const [mobile, setModbile] = useState("");
    const [address, setAddress] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [pincode, setPincode] = useState("");
    const [error, setError] = useState(null);

    const addAddress = async () => {
        try {
            const response = await axiosInstance.post("/adduseraddress", {
                fullname: fullname,
                mobile: mobile,
                address: address,
                state: state,
                city: city,
                pincode: pincode
            })
            if (response.data && response.data.data) {
                console.log("Address Created: ", response.data.data)
                const createdAddressId = response.data.data._id;
                const updateResponse = await axiosInstance.put("/addAddressByReq", {
                    addressId: createdAddressId
                });
                if(updateResponse.data && updateResponse.data.success){
                    console.log("Address added to user's array: ", updateResponse.data)
                    onClose();
                }
            }
            fetchAddresses();
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setError(error.response.data.error);
            } else {
                setError("An unknown error occurred.");
            }
        }
    }
    const handleSubmit = async () => {
        if (!fullname || !mobile || !address || !state || !city || !pincode) {
            setError("Field is required");
            return;
        }
        setError("");
        addAddress()
        fetchAddresses()
    }

    return (
        <div className='relative'>
            <button className='w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 transition-all ease-in-out' onClick={onClose}>
                <IoMdClose className='text-xl text-red-700' />
            </button>
            <h1 className='text-2xl font-bold'>Add New Address</h1>
            <div className='flex flex-col gap-2 my-2'>
                <label className='input-label'>Full Name</label>
                <input type="text" name="" className='bg-gray-300 text-sm outline-none rounded py-3 px-2' id="" value={fullname} onChange={(e) => setFullname(e.target.value)} />
            </div>
            <div className='flex flex-col gap-2 my-2'>
                <label className='input-label'>Phone Number</label>
                <input type="number" name="" className='bg-gray-300 text-sm outline-none rounded py-3 px-2' id="" value={mobile} onChange={(e) => setModbile(e.target.value)} />
            </div>
            <div className='flex flex-col gap-2 my-2'>
                <label className='input-label'>Address</label>
                <input type="text" name="" className="bg-gray-300 text-sm outline-none rounded py-3 px-2" id="" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <div className='flex flex-col gap-2 my-2'>
                <label className='input-label'>State</label>
                <input type="text" name="" className="bg-gray-300 text-sm outline-none rounded py-3 px-2" id="" value={state} onChange={(e) => setState(e.target.value)} />
            </div>
            <div className='flex flex-col gap-2 my-2'>
                <label className='input-label'>City</label>
                <input type="text" name="" className="bg-gray-300 text-sm outline-none rounded py-3 px-2" id="" value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
            <div className='flex flex-col gap-2 my-2'>
                <label className='input-label'>Pin Code</label>
                <input type="number" name="" className="bg-gray-300 text-sm outline-none rounded py-3 px-2" id="" value={pincode} onChange={(e) => setPincode(e.target.value)} />
            </div>
            {error && <p className='text-sm text-red-500'>{error}</p>}
            <div className='flex flex-col gap-2 my-2'>
                <button className='btn-primary' onClick={handleSubmit}>Add</button>
            </div>
        </div>
    )
}

export default NewAddress