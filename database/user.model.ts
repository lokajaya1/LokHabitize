import mongoose, { Schema, model, models, Model, Document } from 'mongoose'

// Define the user interface
export interface IUser extends Document {
  email: string
  password: string
  createdAt: Date
}

// Define the user schema
const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  {
    timestamps: true // Adds createdAt and updatedAt fields
  }
)

// Check if the model already exists, otherwise define it
const User: Model<IUser> = models?.User || model<IUser>('User', UserSchema)

export default User
