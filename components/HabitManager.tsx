'use client'

import React, { useState } from 'react'
import AddHabit from './AddHabit'
import HabitList from './HabitList'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const HabitManager: React.FC = () => {
  const [habits, setHabits] = useState<any[]>([])
  const [isAddHabitOpen, setIsAddHabitOpen] = useState(false)

  const handleAddHabit = async (newHabit: Record<string, any>) => {
    try {
      setHabits((prev) => [
        ...prev,
        { ...newHabit, id: Date.now().toString(), completed: false }
      ])
    } catch (error) {
      console.error('Failed to add habit:', error)
    }
  }

  const toggleAddHabitModal = () => {
    setIsAddHabitOpen((prev) => !prev)
  }

  const completedHabits = habits.filter((habit) => habit.completed)

  return (
    <div className="flex-1">
      <div className="bg-white p-6 rounded-lg shadow">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">All Habit Tracker</h2>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="p-2 bg-transparent shadow-none hover:bg-transparent border-black"
            >
              <Image
                src="/icons/search.svg"
                width={18}
                height={18}
                alt="search"
              />
            </Button>
            <Button
              className="h-10 bg-primary text-white rounded-md flex items-center px-4"
              onClick={toggleAddHabitModal}
            >
              <span>Add Habit</span>
              <Image
                src="/icons/add_circle.svg"
                width={24}
                height={24}
                alt="add circle"
              />
            </Button>
          </div>
        </div>

        {/* Habit List Section */}
        <HabitList />

        {/* Completed Habits */}
        {completedHabits.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-bold text-gray-700 mb-4">
              Completed Habits
            </h3>
            <ul className="space-y-3">
              {completedHabits.map((habit) => (
                <li
                  key={habit.id}
                  className="p-4 bg-green-100 rounded-md flex justify-between"
                >
                  <span>{habit.title}</span>
                  <span className="text-green-700 font-semibold">Done</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Add Habit Modal */}
        {isAddHabitOpen && (
          <AddHabit onClose={toggleAddHabitModal} onCreate={handleAddHabit} />
        )}
      </div>
    </div>
  )
}

export default HabitManager
