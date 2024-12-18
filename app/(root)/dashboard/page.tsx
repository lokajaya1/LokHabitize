'use client'

import { useSession } from 'next-auth/react'
import Article from '@/components/Article'
import LeftSidebar from '@/components/LeftSidebar'
import Header from '@/components/header'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import AddHabit from '@/components/AddHabit'

const Dashboard = () => {
  const { data: session, status } = useSession() // Menambahkan status untuk pengecekan session
  const [isAddHabitOpen, setIsAddHabitOpen] = useState(false)

  const handleCreateHabit = (habit: Record<string, any>) => {
    console.log('Habit created:', habit)
  }
  if (status === 'loading') {
    // Optionally, you can show a loading indicator if session data is still being fetched
    return <div>Loading...</div>
  }

  if (!session) {
    return <div>Please log in to view the dashboard.</div> // Handle if session is not available
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
          <div className="flex-1">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  All Habit Tracker
                </h2>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    className="w-10 h-10 flex justify-center items-center border border-black rounded-md p-0"
                  >
                    <Image
                      src="/icons/search.svg"
                      width={18}
                      height={18}
                      alt="search"
                    />
                  </Button>
                  <Button
                    className="h-10 bg-primary text-white rounded-md flex items-center"
                    onClick={() => setIsAddHabitOpen(true)}
                  >
                    <span>Add Habit</span>
                    <Image
                      src="/icons/add_circle.svg"
                      width={24}
                      height={24}
                      alt="add circle"
                    />
                  </Button>

                  {isAddHabitOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-2xl relative">
                        <button
                          className="absolute top-2 right-2 text-gray-600"
                          onClick={() => setIsAddHabitOpen(false)}
                        >
                          X
                        </button>
                        <AddHabit
                          onClose={() => setIsAddHabitOpen(false)}
                          onCreate={handleCreateHabit}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Habit Items */}
              <div className="space-y-4 mb-4">
                {[
                  {
                    icon: 'fa-book',
                    color: 'bg-purple-600',
                    title: 'Study',
                    time: '06:00 pm',
                    location: 'Home',
                    duration: '60min'
                  },
                  {
                    icon: 'fa-utensils',
                    color: 'bg-black',
                    title: 'Cooking Meal Prep',
                    time: '08:00 pm',
                    location: 'Home',
                    duration: '45min'
                  },
                  {
                    icon: 'fa-dumbbell',
                    color: 'bg-gray-800',
                    title: 'Work Out',
                    time: '08:00 pm',
                    location: 'Home',
                    duration: '45min'
                  }
                ].map((habit, index) => (
                  <div
                    className="flex items-center justify-between"
                    key={index}
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`${habit.color} p-3 rounded-lg flex justify-center items-center w-10 h-10`}
                      >
                        <i
                          className={`fas ${habit.icon} text-white text-xl`}
                        ></i>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">
                          {habit.title}
                        </h3>
                        <div className="text-gray-500 flex items-center space-x-2">
                          <span>{habit.time}</span>
                          <span>•</span>
                          <span>{habit.location}</span>
                          <span>•</span>
                          <span>{habit.duration}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg">
                        Done
                      </button>
                      <div className="w-10 h-10 flex justify-center items-center">
                        <i className="fas fa-ellipsis-v text-xl"></i>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <hr className="border-gray-300" />

              {/* Completed Habit */}
              <div className="mt-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Completed Habits
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      icon: 'fa-running',
                      color: 'bg-gray-300',
                      title: 'Morning Run',
                      time: '07:00 am',
                      location: 'Park',
                      duration: '25min'
                    },
                    {
                      icon: 'fa-book-reader',
                      color: 'bg-gray-300',
                      title: 'Read Book',
                      time: '09:00 pm',
                      location: 'Home',
                      duration: '30min'
                    }
                  ].map((habit, index) => (
                    <div
                      className="flex items-center justify-between text-gray-500"
                      key={index}
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`${habit.color} p-3 rounded-lg flex justify-center items-center w-10 h-10`}
                        >
                          <i
                            className={`fas ${habit.icon} text-white text-xl`}
                          ></i>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-800">
                            {habit.title}
                          </h3>
                          <div className="text-gray-500 flex items-center space-x-2">
                            <span>{habit.time}</span>
                            <span>•</span>
                            <span>{habit.location}</span>
                            <span>•</span>
                            <span>{habit.duration}</span>
                          </div>
                        </div>
                      </div>
                      <i className="fas fa-ellipsis-v text-xl"></i>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex justify-center">
                <button className="bg-gray-200 text-gray-800 px-2 py-1 rounded-lg text-sm flex items-center space-x-1">
                  <span>See more</span>
                  <i className="fas fa-chevron-down"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-1/3 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Reminder</h2>
                <div className="w-10 h-10 flex justify-center items-center">
                  <i className="fas fa-ellipsis-v text-xl"></i>
                </div>
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

            <Article />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
