import { NextApiRequest, NextApiResponse } from 'next'
import User from '@/database/user.model'
import { hash } from 'bcryptjs'
import connectToDatabase from '@/lib/mongoose'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    await connectToDatabase()

    const { email, password } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    // Hash the password and save the new user
    const hashedPassword = await hash(password, 10)
    const newUser = await User.create({
      email,
      password: hashedPassword
    })

    res
      .status(201)
      .json({ message: 'User created successfully', user: newUser })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
