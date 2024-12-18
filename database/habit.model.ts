import { model, models, Schema, Document } from 'mongoose'

export interface IHabit {
  title: string
  goal: number
  repeat: 'Daily' | 'Weekly' | 'Monthly'
  startDate: Date
  location?: string
  duration: number
  durationUnit: 'Mins' | 'Hours' | 'Times' | 'Km' | 'M'
  reminder?: string
}

export interface IHabitDoc extends IHabit, Document {}

const HabitSchema = new Schema<IHabit>(
  {
    title: { type: String, required: true },
    goal: { type: Number, required: true, min: 1 },
    repeat: {
      type: String,
      enum: ['Daily', 'Weekly', 'Monthly'],
      required: true
    },
    startDate: { type: Date, required: true },
    location: { type: String },
    duration: { type: Number, required: true, min: 1 },
    durationUnit: {
      type: String,
      enum: ['Mins', 'Hours', 'Times', 'Km', 'M'],
      required: true
    },
    reminder: { type: String, default: 'No reminder set' }
  },
  { timestamps: true }
)

HabitSchema.index({ title: 1 })

const Habit = models?.Habit || model<IHabit>('Habit', HabitSchema)

export default Habit
