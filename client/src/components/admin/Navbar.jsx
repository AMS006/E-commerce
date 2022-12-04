import React from 'react'
import {logout} from '../../redux_1/user/user.action'
import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = () =>{
    dispatch(logout())
    navigate('/')
  }
  return (
    <div className='flex  px-8 text-white justify-between py-3 items-center' style={{background:'#3c8dbc'}}>
      <h1 className='font-bold text-2xl'>
        Admin DashBoard
      </h1>
      <div className='flex items-center bg-white text-teal-500 font-semibold px-2 py-1'>
        <button className='' onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar
