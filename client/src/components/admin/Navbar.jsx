import React from 'react'

function Navbar() {
  return (
    <div className='flex  px-8 text-white justify-between py-3 items-center' style={{background:'#3c8dbc'}}>
      <h1 className='font-bold text-2xl'>
        Admin DashBoard
      </h1>
      <div className='flex items-center bg-white text-teal-500 font-semibold px-2 py-1'>
        <button className=''>Logout</button>
      </div>
    </div>
  )
}

export default Navbar
