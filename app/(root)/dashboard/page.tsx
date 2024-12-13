import React from 'react'

const Dashboard = () => {
  return (
    <div className="bg-gray-100 font-sans h-screen flex p-4">
      {/* Sidebar */}
      <div className="bg-gray-900 text-white w-14 flex flex-col items-center py-4 rounded-lg h-auto">
        {['fa-th-large', 'fa-calendar-alt', 'fa-sign-out-alt'].map(
          (icon, index) => (
            <div
              key={index}
              className="mb-8 flex justify-center items-center w-10 h-10"
            >
              <i className={`fas ${icon} text-xl`}></i>
            </div>
          )
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <img
              src="https://storage.googleapis.com/a1aa/image/JQW7zykhEAIcFhWTT9onHORJQbID4mCfAAoB6ISRHds3iS9JA.jpg"
              alt="User avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="w-10 h-10 flex justify-center items-center">
              <i className="fas fa-bell text-xl"></i>
            </div>
            <div className="w-10 h-10 flex justify-center items-center">
              <i className="fas fa-ellipsis-v text-xl"></i>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-800">LokHabitize</div>
        </div>

        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-800">Hi, John!</h1>
        </div>

        <div className="flex space-x-6">
          {/* Left Column */}
          <div className="flex-1">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  All Habit Tracker
                </h2>
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 flex justify-center items-center">
                    <i className="fas fa-search text-xl"></i>
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                    <i className="fas fa-plus"></i>
                    <span>Add Habit</span>
                  </button>
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

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  The Nine Habits to Increase Your Energy
                </h2>
              </div>
              <div className="flex items-center space-x-4">
                <img
                  src="https://storage.googleapis.com/a1aa/image/FOF7XfkftatZiUkEJ5FiQ6Cnkj6ORWi7fWO3rzsnduVaLK1nA.jpg"
                  alt="Article"
                  className="rounded-lg"
                  width={80}
                  height={80}
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                  <span>Read More</span>
                  <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
