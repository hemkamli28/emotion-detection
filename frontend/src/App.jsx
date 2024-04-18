import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Dashboard from './Pages/Dashboard'
import Report from './Pages/Report'
import Profile from './Pages/Profile'
import EditProfile from './Pages/EditProfile'
import Home from './Pages/Home'
import Admin from './Pages/Admin'
import Users from './Pages/Users'
import RecordById from './Components/RecordById'
import DetailedInfo from './Components/DetailedInfo'
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/report" element={<Report />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/admin/emotion" element={<Admin />} />
          <Route path="/admin/user" element={<Users />} />
          <Route path="/admin/user/:id" element={<RecordById />} />
          <Route path="/detailedInfo/:id" element={<DetailedInfo />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
