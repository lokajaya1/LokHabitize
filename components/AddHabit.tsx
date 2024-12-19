import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import Image from 'next/image'
import { titleOptions } from '@/constants/habitOptions'
import { createHabit } from '@/lib/actions/habit.action'

interface HabitData {
  title: string
  goal: string | number
  repeat: string
  startDate: string
  location: string
  duration: string | number
  durationUnit: string
  reminder: string
}

interface AddHabitProps {
  onClose: () => void
  onCreate: (newHabit: HabitData) => Promise<void>
}

const AddHabit: React.FC<AddHabitProps> = ({ onClose, onCreate }) => {
  const [habitData, setHabitData] = useState<HabitData>({
    title: '',
    goal: '',
    repeat: 'Daily',
    startDate: '',
    location: '',
    duration: '',
    durationUnit: 'Mins',
    reminder: ''
  })

  const [isDropdownVisible, setIsDropdownVisible] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const today = new Date().toISOString().split('T')[0]

  const handleInputChange = (field: keyof HabitData, value: any) => {
    if (field === 'goal' || field === 'duration') {
      value = value !== '' ? Math.max(0, Number(value)) : ''
    }
    setHabitData((prev) => ({ ...prev, [field]: value }))
  }

  const validateForm = (): string | null => {
    const requiredFields: (keyof HabitData)[] = [
      'title',
      'goal',
      'startDate',
      'location',
      'duration',
      'reminder'
    ]

    for (const field of requiredFields) {
      if (!habitData[field]) {
        return `Field "${field}" is required.`
      }
    }

    if (new Date(habitData.startDate) < new Date(today)) {
      return 'Start date cannot be in the past.'
    }

    if (Number(habitData.goal) <= 0) {
      return 'Goal must be greater than zero.'
    }

    if (Number(habitData.duration) <= 0) {
      return 'Duration must be greater than zero.'
    }

    return null
  }

  const handleCreate = async () => {
    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    setError(null)
    setIsLoading(true)

    try {
      await onCreate(habitData) // Pastikan fungsi ini menangani penyimpanan ke MongoDB
      setIsLoading(false)
      onClose() // Tutup modal setelah berhasil
    } catch (err: any) {
      console.error('Error creating habit:', err.message || err)
      setError('Failed to create habit. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-2xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">New Habit</h2>
          <div className="space-x-2">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create'}
            </Button>
          </div>
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form className="space-y-6">
          {/* Title Input */}
          <div>
            <Label htmlFor="title">Title</Label>
            <div className="relative flex items-center space-x-2">
              <Input
                id="title"
                type="text"
                placeholder="Enter habit title"
                value={habitData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="bg-gray-100 text-black border-none"
              />
              <Button
                className="p-2 bg-primary rounded-xl"
                type="button"
                onClick={() => setIsDropdownVisible((prev) => !prev)}
              >
                <Image
                  src="/icons/book.svg"
                  width={20}
                  height={20}
                  alt="book"
                />
              </Button>
              {isDropdownVisible && (
                <div className="absolute top-12 left-0 bg-white border border-gray-300 shadow-lg rounded-md w-full z-10 max-h-72 overflow-y-auto">
                  {titleOptions.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-2 p-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        handleInputChange('title', option.value)
                        setIsDropdownVisible(false)
                      }}
                    >
                      <Image
                        src={option.icon}
                        alt={option.value}
                        width={20}
                        height={20}
                        className="inline-block"
                      />
                      <span>{option.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Grid Section 1 */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="goal">Goal</Label>
              <Input
                id="goal"
                type="number"
                min={0}
                placeholder="Enter goal"
                value={habitData.goal}
                onChange={(e) => handleInputChange('goal', e.target.value)}
                className="bg-gray-100 text-black border-none"
              />
            </div>
            <div>
              <Label htmlFor="repeat">Repeat</Label>
              <Select
                onValueChange={(value) => handleInputChange('repeat', value)}
                value={habitData.repeat}
              >
                <SelectTrigger className="bg-gray-100 text-black border-none">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Daily">Daily</SelectItem>
                  <SelectItem value="Weekly">Weekly</SelectItem>
                  <SelectItem value="Monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                min={today}
                value={habitData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
                className="bg-gray-100 text-black border-none"
              />
            </div>
          </div>

          {/* Grid Section 2 */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                type="text"
                placeholder="Enter location"
                value={habitData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="bg-gray-100 text-black border-none"
              />
            </div>
            <div>
              <Label htmlFor="duration">Duration</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="duration"
                  type="number"
                  min={0}
                  placeholder=""
                  value={habitData.duration}
                  onChange={(e) =>
                    handleInputChange('duration', e.target.value)
                  }
                  className="bg-gray-100 text-black border-none"
                />
                <Select
                  onValueChange={(value) =>
                    handleInputChange('durationUnit', value)
                  }
                  value={habitData.durationUnit}
                >
                  <SelectTrigger className="bg-gray-100 text-black border-none">
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mins">Mins</SelectItem>
                    <SelectItem value="Hours">Hours</SelectItem>
                    <SelectItem value="Times">Times</SelectItem>
                    <SelectItem value="Km">Km</SelectItem>
                    <SelectItem value="M">M</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="reminder">Reminder</Label>
              <Input
                id="reminder"
                type="time"
                value={habitData.reminder}
                onChange={(e) => handleInputChange('reminder', e.target.value)}
                className="bg-gray-100 text-black border-none"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddHabit
