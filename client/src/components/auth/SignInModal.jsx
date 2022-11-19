import * as React from 'react';
import Dialog from '@mui/material/Dialog';

import DialogContent from '@mui/material/DialogContent';
import LogoLogin from './loginLogo.png'
import Logo from '../Navbar/logo.png'
import './style.css'

import { GrSecure } from 'react-icons/gr'
import { MdOutlineEmail } from 'react-icons/md'
import { useState } from 'react';
import SignUpModal from './SignUpModal';
export default function SignInModal({open,setOpen}) {
  const handleClose = () => setOpen(false);
    const [signUpOpen,setSignUpOpen] = useState(false);
    const handleSignUpOpen = (event) => {
        event.preventDefault();
        setOpen(false);
        setSignUpOpen(true);
    }
  return (
    <div>
        <SignUpModal open={signUpOpen} setOpen={setSignUpOpen} signInOpen={open} setSignInOpen={setOpen}/>
      <Dialog
        open={open}
        
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
            <div className='md:flex items-center border border-teal-500'>
                <div className='flex items-center justify-center md:w-2/5 w-full md:px-4 px-2 md:py-0 py-2 md:gap-10 gap-3 md:flex-col text-white h-full bg-teal-500'>
                    <div>
                        <h1 className='font-extrabold md:text-3xl text-xl py-2'>Login</h1>
                        <p className='md:text-xl '>Login to get access to your all orders,and wishlist</p>
                    </div>
                    <div className='md:h-full md:w-full h-32'>
                        <img src={LogoLogin} alt="Logo" className='w-full h-full object-cover'></img>
                    </div>
                </div>
                <div className='h-full flex items-center justify-center relative md:gap-10 gap-6 flex-col md:w-3/5 px-2 md:py-0 py-4'>
                    <div className='md:h-12 h-8 w-24 bg-teal-500 p-1 flex rounded-lg'>
                        <img src={Logo} alt="Logo" className="h-full w-full" />
                        <button className='closeBtn' onClick={handleClose}>X</button>
                    </div>
                    <form action="" className='w-full h-full'>
                        <div className='flex flex-col gap-7 '>

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
                                <input type="submit" value="Login" className='cursor-pointer w-full h-full' />
                            </div>
                            <div className='text-teal-500 text-center w-full'>
                                <button onClick={handleSignUpOpen}>New to eShop? Create an account</button>
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