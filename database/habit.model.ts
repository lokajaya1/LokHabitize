import { model, models, Schema, Document } from 'mongoose'

type DurationUnit = 'Mins' | 'Hours' | 'Times' | 'Km' | 'M'
type Repeat = 'Daily' | 'Weekly' | 'Monthly'

export interface IHabit {
  title: string
  goal: number
  repeat: Repeat
  startDate: Date
  location?: string
  duration: number
  durationUnit: DurationUnit
  reminder?: string
}

export interface IHabitDoc extends IHabit, Document {
  totalDuration: number
}

const HabitSchema = new Schema<IHabitDoc>(
  {
    title: { type: String, required: true, index: true },
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
    reminder: {
      type: String,
      validate: {
        validator: function (value: string) {
          return /^\d{2}:\d{2}$/.test(value) || value === 'No reminder set'
        },
        message:
          'Reminder must be in HH:MM format or default as "No reminder set".'
      },
      default: 'No reminder set'
    }
  },
  { timestamps: true }
)

// Index untuk pencarian teks
HabitSchema.index({ title: 'text', location: 'text' })

// Virtual field untuk total durasi
HabitSchema.virtual('totalDuration').get(function () {
  return this.duration * this.goal
})

// Pre-save hook untuk validasi tambahan
HabitSchema.pre('save', function (next) {
  if (!this.reminder || !/^\d{2}:\d{2}$/.test(this.reminder)) {
    this.reminder = 'No reminder set'
  }
  next()
})

const Habit = models?.Habit || model<IHabitDoc>('Habit', HabitSchema)

export default Habit
