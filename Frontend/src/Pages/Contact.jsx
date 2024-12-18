import React from 'react'

const Contact = () => {
    return (
        <>
            <div className='title mx-[400px] py-[36px]'>
                <h1 className='text-[52px] font-bold mb-[40px]'>Contact</h1>
                <form action="" className='mx-[40px] py-[36px]'>
                    <div className='flex gap-[20px]'>
                        <input className='mb-[20px] p-[15px] m-[1px] border-[2px] border-black w-full h-[45px]' type="text" name="" id="" placeholder='Name' />
                        <input className='mb-[20px] p-[15px] m-[1px] border-[2px] border-black w-full h-[45px]' type="text" name="" id="" placeholder="Email *" />
                    </div>
                    <div className='flex'>
                        <input className='mb-[20px] p-[15px] m-[1px] border-[2px] border-black w-full h-[45px]' type="number" name="" id="" placeholder='Phone Number' />
                    </div>
                    <div className='flex mb-[20px]'>
                        <textarea className='w-full h-[100px] border-[2px] border-black flex' name="" id="" placeholder='Comment'></textarea>
                    </div>
                    <button className='w-[120px] h-[45px] bg-black text-white hover:text-black hover:bg-white transition-colors'>Send</button>
                </form>
            </div>
        </>
    )
}

export default Contact