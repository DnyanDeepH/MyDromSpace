import React from 'react'
import MainLayout from '../components/layout/MainLayout'

const Index = () => {
  return (
    <MainLayout>
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1728721797530-e766e5c75024?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        <div className="bg-black/40 absolute inset-0"></div>
        <div className="text-center relative z-10 px-4 py-16 max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 text-white">Welcome to MyDormSpace</h1>
          <p className="text-2xl text-gray-200 mb-8">Find Your Perfect Student Room</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-dorm-600 hover:bg-dorm-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              Browse Rooms
            </button>
            <button className="bg-white hover:bg-gray-100 text-dorm-800 font-semibold py-3 px-6 rounded-lg transition-colors">
              List Your Room
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Index
