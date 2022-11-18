import React from 'react'
import logo from './logo.png'
import { BiSearchAlt2 } from 'react-icons/bi'
import { FaShoppingCart } from 'react-icons/fa'
function Navbar() {
    return (
        <div className='bg-teal-500 md:py-3 py-2 md:px-16 px-2'>
            <div className='flex justify-between'>
                <div className='flex gap-3 items-center w-1/2'>
                    <div className='md:h-12 h-8 md:w-28 w-24'>
                        <img src={logo} alt="Logo" className='h-full w-full' />
                    </div>
                    <div className='w-full relative hidden md:block'>
                        <input type="text" className='px-2 py-2 w-full rounded-sm text-sm focus:outline-none' name="" placeholder='Search for products...' id="" />
                        <span className='absolute right-1  text-xl font-extrabold text-teal-500' style={{top:'9px'}}><BiSearchAlt2 /></span>
                    </div>
                </div>
                <div className='flex gap-4 items-center'>
                    
                    <div className='cursor-pointer'>
                        <span className='text-3xl text-white'>
                            <FaShoppingCart />
                        </span>
                    </div>
                    <div>
                        <button className='bg-white text-teal-500 md:py-2 py-1 shadow-sm px-3 font-semibold'>Login</button>
                        
                    </div>
                </div>
            </div>
            <div className='w-full relative pt-2 md:hidden'>
                <input type="text" className='px-2 py-2 w-full rounded-sm text-sm focus:outline-none' name="" placeholder='Search for products...' id="" />
                <span className='absolute right-1  text-xl font-extrabold text-teal-500' style={{top:'15.5px'}}><BiSearchAlt2 /></span>
            </div>
        </div>
    )
}

export default Navbar