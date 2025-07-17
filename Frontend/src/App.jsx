import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Start from './pages/Start'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserLogout from './pages/UserLogout'
import UserSignUp from './pages/UserSignUp'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import CaptainHome from './pages/CaptainHome'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper'
import CaptainLogout from './pages/CaptainLogout'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'
// import { useContext } from 'react'

export default function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Start/>} />
        <Route path='/login' element={<UserLogin/>} />
        <Route path='/signup' element={<UserSignUp/>} />
        <Route path='/captain-login' element={<CaptainLogin/>} />
        <Route path='/captain-signup' element={<CaptainSignup/>} />
        <Route path='/riding' element={<Riding/>} />
        <Route path='/captain-riding' element={<CaptainRiding/>} />
        <Route path='/home' element={
          <UserProtectedWrapper>
          <Home/>
          </UserProtectedWrapper>
          } />
        <Route path='/captain-home' element={
          <CaptainProtectedWrapper>
          <CaptainHome/>
          </CaptainProtectedWrapper>
          } />
        <Route path='/user/logout' element={
          <UserProtectedWrapper>
          <UserLogout/>
          </UserProtectedWrapper>
          } />
        <Route path='/captain/logout' element={
          <CaptainProtectedWrapper>
          <CaptainLogout/>
          </CaptainProtectedWrapper>
          } />
      </Routes>
    </div>
  )
}
