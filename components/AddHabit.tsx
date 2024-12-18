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

interface AddHabitProps {
  onClose: () => void
  onCreate: (habit: Record<string, any>) => void
}

const AddHabit: React.FC<AddHabitProps> = ({ onClose, onCreate }) => {
  const [timesUnit, setTimesUnit] = useState('Mins')
  const [habitData, setHabitData] = useState({
    title: '',
    goal: 1,
    repeat: 'Daily',
    startDate: '',
    location: '',
    duration: 0,
    reminder: ''
  })

  const handleInputChange = (field: string, value: any) => {
    setHabitData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCreate = () => {
    onCreate({ ...habitData, durationUnit: timesUnit })
    onClose()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">New Habit</h2>
          <div className="space-x-2">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleCreate}>Create</Button>
          </div>
        </div>
        <form className="space-y-6">
          {/* Title Input */}
          <div>
            <Label htmlFor="title" className="text-gray-600">
              Title
            </Label>
            <div className="flex items-center space-x-2">
              <Input
                id="title"
                type="text"
                placeholder="Enter habit title"
                value={habitData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          {/* Grid Section 1 */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="goal" className="text-gray-600">
                Goal
              </Label>
              <Input
                id="goal"
                type="number"
                placeholder="Enter goal"
                value={habitData.goal}
                onChange={(e) => handleInputChange('goal', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="repeat" className="text-gray-600">
                Repeat
              </Label>
              <Select
                onValueChange={(value) => handleInputChange('repeat', value)}
                value={habitData.repeat}
              >
                <SelectTrigger
                  id="repeat"
                  className="bg-white text-gray-700 rounded-md px-3 py-2"
                >
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent className="z-[60] bg-white shadow-lg border border-gray-300 rounded-md mt-1">
                  <SelectItem value="Daily">Daily</SelectItem>
                  <SelectItem value="Weekly">Weekly</SelectItem>
                  <SelectItem value="Monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="start-date" className="text-gray-600">
                Start Date
              </Label>
              <Input
                id="start-date"
                type="date"
                placeholder="Select start date"
                value={habitData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
              />
            </div>
          </div>

          {/* Grid Section 2 */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="location" className="text-gray-600">
                Location
              </Label>
              <Input
                id="location"
                type="text"
                placeholder="Enter location"
                value={habitData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="duration" className="text-gray-600">
                Duration
              </Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="duration"
                  type="number"
                  placeholder="Enter duration"
                  value={habitData.duration}
                  onChange={(e) =>
                    handleInputChange('duration', e.target.value)
                  }
                />
                <Select
                  onValueChange={(value) => setTimesUnit(value)}
                  value={timesUnit}
                >
                  <SelectTrigger className="bg-white border border-gray-300 text-gray-700">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent className="z-[60] bg-white shadow-lg rounded-md">
                    <SelectItem value="Mins">Mins</SelectItem>
                    <SelectItem value="Hours">Hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="reminder" className="text-gray-600">
                Reminder
              </Label>
              <Input
                id="reminder"
                type="time"
                placeholder="Set reminder"
                value={habitData.reminder}
                onChange={(e) => handleInputChange('reminder', e.target.value)}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddHabit
