import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'
function AdminRoute() {
    
    const {isAuthenticated, user} = useSelector(state=>state.auth)

  return (
    // user?.roles == 'admin' && 
    isAuthenticated ? <Outlet/>:<Navigate to={'/'} replace={true}/>
  )
}

export default AdminRoute