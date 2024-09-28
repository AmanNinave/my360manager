import React from 'react'
import { Sidebar } from '../components/Sidebar'
import { TopNavBar } from '../components/TopNavbar'
import Dashboard from './Dashboard'

const Home = () => {
    return (
        <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar />
    
        {/* Main content area */}
        <div className="flex-1 flex flex-col">
          {/* Top Navbar */}
          <TopNavBar />
    
          {/* Main content */}
          <div className="p-6 bg-gray-100 max-h-[90vh]  flex-1 overflow-hidden">
            <Dashboard/>
          </div>
        </div>
      </div>
      )
}

export default Home