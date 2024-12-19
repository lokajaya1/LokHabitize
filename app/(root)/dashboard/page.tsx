'use client'

import { useSession } from 'next-auth/react'
import LeftSidebar from '@/components/LeftSidebar'
import Header from '@/components/header'
import Article from '@/components/Article'
import HabitManager from '@/components/HabitManager'

const Dashboard = () => {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session) {
    return <div>Please log in to view the dashboard.</div>
  }

  return (
    <div className="bg-gray-100 font-sans h-screen flex p-4">
      {/* Sidebar */}
      <LeftSidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <Header />

        <div className="mb-6">
          <h1>Hi, {session?.user?.name}!</h1>
        </div>

        <div className="flex space-x-6">
          {/* Habit Manager */}
          <HabitManager />

          {/* Right Column */}
          <div className="w-1/3 space-y-6">
            {/* Reminder Section */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Reminder</h2>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-purple-600 p-4 rounded-full mb-4">
                  <i className="fas fa-bell text-white text-2xl"></i>
                </div>
                <p className="text-gray-800 text-center">
                  Don't forget to take your pills. Stay healthy!
                </p>
              </div>
            </div>

            {/* Article Section */}
            <Article />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
