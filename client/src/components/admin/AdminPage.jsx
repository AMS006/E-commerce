import React from 'react'
import Layout from './Layout'
import { Outlet,useLocation,Navigate } from 'react-router-dom'

function AdminPage() {
  const {pathname} = useLocation();
  if(pathname === "/admin/dashboard"){
    return <Navigate to='/admin/dashboard/Category' />
  }
  return (
    <div>
        <Outlet />
    </div>
  )
}

export default Layout(AdminPage)
