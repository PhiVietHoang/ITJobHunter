import React from 'react'
import { Routes,Route } from 'react-router-dom'
import { LandingPage1 } from './LandingPage1.jsx'
import { LandingPage2 } from './LandingPage2'
import { Login } from './Login'
import { Navbar } from './Navbar1'
//import { Register } from './register'
import { Register1 } from './Register1'

export const AllRoutes = () => {
  return (
   <>
{/* <Navbar></Navbar> */}
<Routes>

  <Route path="/" element={<LandingPage1/>}></Route>
<Route path="/register" element={<Register1/>}></Route>
<Route path="/login" element={<Login/>}></Route>


<Route path="/home" element={
     <PrivateRoute>
     <LandingPage2/>
     </PrivateRoute>
     } ></Route>
</Routes>
   </>
  )
}
