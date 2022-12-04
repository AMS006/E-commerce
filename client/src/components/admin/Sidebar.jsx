import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Sidebar() {
  const {pathname} = useLocation()
    const sideLinks = [
      {
        name:"Category",
        isActive: pathname.includes("Category")
      },
      {
        name:"Products",
        isActive: pathname.includes("Products")
      },
      {
        name:"Orders",
        isActive: pathname.includes("Orders")
      }
    ]
  return (
    <div className='h-full w-44 flex flex-col gap-3 items-center py-3 pt-6 px-2 text-white fixed left-0' style={{background:'#1a2225'}}>
        {sideLinks.map((items,index)=>(
            <div className={`${items.isActive?'bg-blue-500 text-white rounded-2xl ':''} w-full text-center py-1`} key={index}>
                <Link to= {`/admin/dashboard/${items.name}`}>{items.name}</Link>
            </div>
        ))}
    </div>
  )
}

export default Sidebar
