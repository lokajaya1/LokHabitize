import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { titleOptions } from '@/constants/habitOptions' // Pastikan path benar

interface Habit {
  _id: string
  title: string
  location: string
  duration: number
  durationUnit: string
  reminder: string
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
        const response = await fetch('/api/habits') // Ganti dengan endpoint API Anda
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

  const getHabitIcon = (title: string): string => {
    const matchedOption = titleOptions.find((option) => option.value === title)
    return matchedOption ? matchedOption.icon : '/icons/key.svg' // Default icon
  }

  return (
    <div className="space-y-8">
      {/* Active Habits */}
      <div>
        {activeHabits.map((habit) => (
          <div
            key={habit._id}
            className="flex items-center justify-between text-white rounded-lg p-4"
          >
            {/* Icon and Info */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-gray-200 flex items-center justify-center">
                <Image
                  src={getHabitIcon(habit.title)}
                  alt={habit.title}
                  width={24}
                  height={24}
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{habit.title}</h3>
                <div className="text-gray-400 flex items-center space-x-2">
                  <span>
                    <i className="far fa-clock"></i> {habit.reminder}
                  </span>
                  <span>•</span>
                  <span>
                    <i className="fas fa-map-marker-alt"></i> {habit.location}
                  </span>
                  <span>•</span>
                  <span>
                    <i className="fas fa-hourglass-half"></i> {habit.duration}{' '}
                    {habit.durationUnit}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 bg-blue-500 px-4 py-2 rounded-lg text-white">
                <i className="fas fa-check"></i>
                <span>Done</span>
              </button>
              <div className="flex items-center justify-center w-10 h-10 bg-gray-800 rounded-full">
                <i className="fas fa-ellipsis-v"></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <hr className="border-gray-700" />

      {/* Completed Habits */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Completed Habits
        </h2>
        <div className="space-y-6">
          {completedHabits.map((habit) => (
            <div
              key={habit._id}
              className="flex items-center justify-between bg-gray-900 text-gray-400 rounded-lg p-4"
            >
              {/* Icon and Info */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
                  <Image
                    src={getHabitIcon(habit.title)}
                    alt={habit.title}
                    width={24}
                    height={24}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-500">
                    {habit.title}
                  </h3>
                  <div className="text-gray-500 flex items-center space-x-2">
                    <span>
                      <i className="far fa-clock"></i> {habit.reminder}
                    </span>
                    <span>•</span>
                    <span>
                      <i className="fas fa-map-marker-alt"></i> {habit.location}
                    </span>
                    <span>•</span>
                    <span>
                      <i className="fas fa-hourglass-half"></i> {habit.duration}{' '}
                      {habit.durationUnit}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center w-10 h-10 bg-gray-800 rounded-full">
                <i className="fas fa-ellipsis-v"></i>
              </div>
            </div>
          ))}
        </div>
        {completedHabits.length > 3 && (
          <div className="mt-4 flex justify-center">
            <button className="bg-gray-800 text-gray-400 px-4 py-2 rounded-lg text-sm flex items-center space-x-1">
              <span>See more</span>
              <i className="fas fa-chevron-down"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default HabitList
