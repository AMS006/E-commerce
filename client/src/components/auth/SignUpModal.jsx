import * as React from 'react';
import Dialog from '@mui/material/Dialog';

import DialogContent from '@mui/material/DialogContent';
import LogoLogin from './loginLogo.png'
import Logo from '../Navbar/logo.png'
import './style.css'
import { GrSecure } from 'react-icons/gr'
import { MdOutlineEmail } from 'react-icons/md'
import {CgProfile} from 'react-icons/cg'
export default function SignUpModal({ open, setOpen, setSignInOpen }) {
    const handleClose = () => setOpen(false);
    const handleOpen = (event) =>{
        event.preventDefault()
        setOpen(false);
        setSignInOpen(true);
    }
    return (
        <div>
            <Dialog
                open={open}
                
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <div className='md:flex items-center border border-teal-500'>
                        <div className='flex items-center justify-center md:w-2/5 w-full md:px-4 px-2 md:py-0 py-2 md:gap-10 gap-3 md:flex-col text-white h-full bg-teal-500'>
                            <div>
                                <h1 className='font-extrabold md:text-3xl text-xl py-2'>Looks like You are New here</h1>
                                <p className='md:text-xl '>SignUp with Us to get access to out all services</p>
                            </div>
                            <div className='md:h-full md:w-full h-32'>
                                <img src={LogoLogin} className='w-full h-full object-cover' alt="Logo"></img>
                            </div>
                        </div>
                        <div className='h-full flex items-center justify-center relative md:gap-10 gap-6 flex-col md:w-3/5 px-2 md:py-0 py-4'>
                            <div className='md:h-12 h-8 w-24 bg-teal-500 p-1 flex rounded-lg'>
                                <img src={Logo} alt="Logo" className="h-full w-full" />
                                <button className='closeBtn' onClick={handleClose}>X</button>
                            </div>
                            <form action="" className='w-full h-full'>
                                <div className='flex flex-col md:gap-6 gap-4 '>
                                    <div className='w-full bg-white relative px-2 border-b border-teal-500'>
                                        <label htmlFor="name">Name</label>
                                        <div className='absolute top-8 px-1'>
                                            <CgProfile />
                                        </div>
                                        <input type="text" placeholder="Enter your Name" className='focus:outline-none py-1 pl-7 pr-2 w-full' name="" id="name" required />
                                    </div>
                                    <div className='w-full bg-white relative px-2 border-b border-teal-500'>
                                        <label htmlFor="email">Email</label>
                                        <div className='absolute top-8 px-1'>
                                            <MdOutlineEmail />
                                        </div>
                                        <input type="email" placeholder="Enter your Email" className='focus:outline-none py-1 pl-7 pr-2 w-full' name="" id="email" required />
                                    </div>
                                    <div className='w-full bg-white relative px-2 border-b border-teal-500'>
                                        <label htmlFor="password">Password</label>
                                        <div className='absolute top-8 px-1'>
                                            <GrSecure />
                                        </div>
                                        <input type="password" placeholder='Enter you Password' className='focus:outline-none py-1 pl-7 pr-2 w-full' name="" id="password" required />
                                    </div>
                                    <div className='w-full text-center  bg-teal-500 py-2 font-bold h-full text-white'>
                                        <input type="submit" value="SignUp" className='cursor-pointer w-full h-full' />
                                    </div>
                                    <div className='text-teal-500 text-center w-full'>
                                        <button onClick={handleOpen}>Already Have a account? LogIn here</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}