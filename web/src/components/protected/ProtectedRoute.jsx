import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router'
import { useNavigate } from 'react-router-dom'
function ProtectedRoute() {
    
    const {isAuthenticated, user} = useSelector(state=>state.auth)

    const navigate = useNavigate();

    // useEffect(()=>{
    //     if(!isAuthenticated && user?.user?.roles !== 'admin'){
    //         return navigate('/login')
    //     }
    // })

  return (
    <Outlet/>
  )
}

export default ProtectedRoute