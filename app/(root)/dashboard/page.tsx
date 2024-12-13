import React from 'react'

const Dashboard = () => {
  return (
    <div className="bg-gray-100 font-sans h-screen">
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="bg-gray-900 text-white w-20 flex flex-col items-center py-4">
          <div className="mb-8">
            <i className="fas fa-th-large text-2xl"></i>
          </div>
          <div className="mb-8">
            <i className="fas fa-calendar-alt text-2xl"></i>
          </div>
          <div className="mt-auto mb-4">
            <i className="fas fa-sign-out-alt text-2xl"></i>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl font-bold">Hi, John!</h1>
            </div>
            <div className="flex items-center space-x-4">
              <img
                src="https://storage.googleapis.com/a1aa/image/ccN33c9SMvJlK1EeruMeTsb9dDVvguvJr3LFKBTwsff0RQnPB.jpg"
                alt="User avatar"
                className="rounded-full"
                width="40"
                height="40"
              />
              <i className="fas fa-bell text-2xl"></i>
              <i className="fas fa-ellipsis-v text-2xl"></i>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Habit Tracker List */}
            <div className="col-span-2 bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">All Habit tracker</h2>
                <div className="flex items-center space-x-2">
                  <button className="bg-white border rounded-lg px-4 py-2">
                    <i className="fas fa-search"></i>
                  </button>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
                    <i className="fas fa-plus mr-2"></i> Add habit
                  </button>
                </div>
              </div>

              {/* Habit Items */}
              <div className="space-y-4">
                {/* Habit 1 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-purple-600 p-3 rounded-lg">
                      <i className="fas fa-book text-white"></i>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Study</h3>
                      <div className="text-gray-500 text-sm flex items-center space-x-2">
                        <span>06:00 pm</span>
                        <span>•</span>
                        <span>Home</span>
                        <span>•</span>
                        <span>60min</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg">
                      Done
                    </button>
                    <i className="fas fa-ellipsis-v text-gray-600"></i>
                  </div>
                </div>

                {/* Habit 2 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-black p-3 rounded-lg">
                      <i className="fas fa-utensils text-white"></i>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">
                        Cooking mealprep
                      </h3>
                      <div className="text-gray-500 text-sm flex items-center space-x-2">
                        <span>08:00 pm</span>
                        <span>•</span>
                        <span>Home</span>
                        <span>•</span>
                        <span>45min</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg">
                      Done
                    </button>
                    <i className="fas fa-ellipsis-v text-gray-600"></i>
                  </div>
                </div>
              </div>
            </div>

            {/* Reminder and Article */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Reminder</h3>
                <div className="flex items-center space-x-4">
                  <div className="bg-purple-600 p-3 rounded-lg">
                    <i className="fas fa-bell text-white"></i>
                  </div>
                  <div>
                    <p className="text-gray-500">
                      Don't forget to take your pills. Stay healthy!
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">
                  The nine habits to increase your energy
                </h3>
                <div className="flex items-center space-x-4">
                  <div>
                    <img
                      src="https://storage.googleapis.com/a1aa/image/eHVSdHbi6YXiZyrlvCrCnQtyLpVvCxYGxysAvJ7kQHkPC68JA.jpg"
                      alt="Illustration of a person exercising"
                      className="rounded-lg"
                      width="100"
                      height="100"
                    />
                  </div>
                  <div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
                      Read More
                      <i className="fas fa-arrow-right ml-2"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
