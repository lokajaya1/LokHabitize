import React, { useEffect, useState } from 'react'

interface Habit {
  _id: string
  name: string
  icon: string
  color: string
  time: string
  location: string
  duration: string
  completed: boolean
}

const HabitList: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/habits')
        const data = await response.json()

        if (response.ok) {
          setHabits(data.data)
        } else {
          setError(data.message || 'Failed to fetch habits')
        }
      } catch (err) {
        setError('An error occurred while fetching habits')
      } finally {
        setLoading(false)
      }
    }

    fetchHabits()
  }, [])

  if (loading) {
    return <div className="text-center">Loading habits...</div>
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>
  }

  const activeHabits = habits.filter((habit) => !habit.completed)
  const completedHabits = habits.filter((habit) => habit.completed)

  return (
    <div>
      {/* Habit Items */}
      <div className="space-y-4 mb-4">
        {activeHabits.map((habit) => (
          <div className="flex items-center justify-between" key={habit._id}>
            <div className="flex items-center space-x-4">
              <div
                className={`${habit.color} p-3 rounded-lg flex justify-center items-center w-10 h-10`}
              >
                <i className={`fas ${habit.icon} text-white text-xl`}></i>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  {habit.name}
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
          {completedHabits.map((habit) => (
            <div
              className="flex items-center justify-between text-gray-500"
              key={habit._id}
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`${habit.color} p-3 rounded-lg flex justify-center items-center w-10 h-10`}
                >
                  <i className={`fas ${habit.icon} text-white text-xl`}></i>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    {habit.name}
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
  )
}

export default HabitList
