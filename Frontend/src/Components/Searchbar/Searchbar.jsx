import React from 'react'
import {FaMagnifyingGlass} from "react-icons/fa6";
import {IoMdClose} from "react-icons/io";

const SearchBar = ({value, onChange, handleSearch, onClearSearch }) => {
    return (
        <div className='w-80 flex items-center px-4 py-2 bg-black bg-light_tan rounded-md'>
            <input type="text" placeholder='Search Notes' className='w-full text-xs bg-transparent text-white py-[11px outline-none] outline-none' value={value} onChange={onChange} />
            {value && <IoMdClose className='text-xl text-white cursor-pointer hover:text-apricot mr-3' onClick={onClearSearch} />}
            <FaMagnifyingGlass className='text-white cursor-pointer hover:text-grey' onClick={handleSearch} />
        </div>
    )
}

export default SearchBar