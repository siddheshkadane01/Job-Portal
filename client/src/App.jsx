import React, { useContext } from 'react'
import {Route, Routes, useLocation} from 'react-router-dom'
import Home from './pages/Home.jsx'
import ApplyJob from './pages/ApplyJob.jsx'
import Applications from './pages/Applications.jsx'
import Navbar from './components/Navbar'
import ReccruterLogin from './components/RecruterLogin.jsx'
import { AppContext } from './context/AppContext'
import DashBoard from './pages/DashBoard.jsx'
import ManageJobs from './pages/ManageJobs.jsx'
import ViewApplications from './pages/ViewApplications.jsx'
import AddJob from './pages/AddJob.jsx'

const App = () => {

  const {showRecruterLogin} = useContext(AppContext)
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <div>
      {!isDashboard && <Navbar />}
      {showRecruterLogin && <ReccruterLogin />}
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/applications" element={<Applications/>} />
        <Route path="/apply-job/:id" element={<ApplyJob/>} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/dashboard" element={<DashBoard />} >
          <Route path="add-job" element={<AddJob />} />
          <Route path="manage-job" element={<ManageJobs />} />
          <Route path="view-applications" element={<ViewApplications />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App