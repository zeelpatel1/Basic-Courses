import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Admin from './pages/Admin'
import Dashboard from './pages/Dashboard'
import ErrorPage from './pages/Error'

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path="/admin" element={<Admin />}/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
      <ToastContainer/>
    </BrowserRouter>
  )
}

export default App
