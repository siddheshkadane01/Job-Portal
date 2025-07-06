import React, { useContext } from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home.jsx'
import ApplyJob from './pages/ApplyJob.jsx'
import Applications from './pages/Applications.jsx'
import Navbar from './components/Navbar'
import ReccruterLogin from './components/RecruterLogin.jsx'
import { AppContext } from './context/AppContext'

const App = () => {

  const {showRecruterLogin} = useContext(AppContext)

  return (
    <div>
      <Navbar />
      {showRecruterLogin && <ReccruterLogin />}
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/applications" element={<Applications/>} />
        <Route path="/apply-job/:id" element={<ApplyJob/>} />
      </Routes>
    </div>
  )
}

export default App