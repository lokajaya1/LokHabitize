import mongoose, { Schema, Document } from 'mongoose'

// Define an interface for the Habit document
export interface IHabit extends Document {
  name: string
  description?: string
  frequency: string[] // e.g., ["Monday", "Wednesday", "Friday"]
  startDate: Date
  isActive: boolean
  userId: mongoose.Types.ObjectId // Reference to a User document
}

// Define the schema for the Habit model
const HabitSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    frequency: {
      type: [String],
      required: true
    },
    startDate: {
      type: Date,
      required: true
    },
    isActive: {
      type: Boolean,
      default: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Assumes there is a User model
      required: true
    }
  },
  {
    timestamps: true // Automatically add createdAt and updatedAt timestamps
  }
)

// Export the Habit model
const Habit = mongoose.model<IHabit>('Habit', HabitSchema)
export default Habit
