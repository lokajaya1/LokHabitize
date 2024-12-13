import { model, models, Schema, Document } from 'mongoose'

export interface IUser {
  name: string
  username: string
  email: string
  bio?: string
  image?: string
  location?: string
  portfolio?: string
  reputation?: number
}

export interface IUserDoc extends IUser, Document {}
const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    image: { type: String }
  },
  { timestamps: true }
)

const User = models?.User || model<IUser>('User', UserSchema)

export default User
