import { User } from 'lucide-react'
import mongoose from 'mongoose'

export default async function signUpHandler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { name, email, username, password } = req.body

  if (!name || !email || !username || !password) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  try {
    await mongoose()

    // Check if username or email already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    })

    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'Email or username already exists' })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await User.create({
      email,
      username,
      password: hashedPassword
    })

    return res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
