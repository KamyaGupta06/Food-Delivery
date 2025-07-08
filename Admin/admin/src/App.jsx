import React from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import Navbar from './components/Navbar/Navbar'
import "./App.css"
import { Routes,Route } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const App = () => {
  const url="http://localhost:4000"
  return (
    <div>
      <ToastContainer></ToastContainer>
      <Navbar/>
      <hr className='border-none h-[1px] bg-[#a9a9a9]'/>
      <div className='flex'>
        <Sidebar />
        <div className='flex-1 p-6'> {/* Add padding if needed */}
          <Routes>
            <Route path="/add" element={<Add url={url}/>} />
            <Route path="/list" element={<List url={url} />} />
            <Route path="/orders" element={<Orders url={url} />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
