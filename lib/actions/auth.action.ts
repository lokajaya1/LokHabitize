import User from '@/database/user.model'
import { hash, compare } from 'bcryptjs'

export const signUpWithCredentials = async (
  email: string,
  password: string
) => {
  const existingUser = await User.findOne({ email })
  if (existingUser) {
    throw new Error('User already exists')
  }

  const hashedPassword = await hash(password, 10)
  const newUser = new User({
    email,
    password: hashedPassword
  })

  await newUser.save()
  return newUser
}

export const signInWithCredentials = async (
  email: string,
  password: string
) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error('Invalid email or password')
  }

  const isPasswordValid = await compare(password, user.password)
  if (!isPasswordValid) {
    throw new Error('Invalid email or password')
  }

  return user
}
