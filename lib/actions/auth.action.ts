import { MongoClient } from 'mongodb'

const client = new MongoClient('your-mongodb-connection-string')
const db = client.db('LokHabitizeDB')
const usersCollection = db.collection('users')

export const signUpWithCredentials = async (data: {
  email: string
  password: string
}) => {
  try {
    await client.connect()
    const user = await usersCollection.insertOne(data)
    return user
  } catch (error) {
    throw new Error('Sign up failed: ' + error.message)
  } finally {
    await client.close()
  }
}

export const signInWithCredentials = async (data: {
  email: string
  password: string
}) => {
  try {
    await client.connect()
    const user = await usersCollection.findOne({ email: data.email })
    if (user && user.password === data.password) {
      return user
    } else {
      throw new Error('Invalid credentials')
    }
  } catch (error) {
    throw new Error('Sign in failed: ' + error.message)
  } finally {
    await client.close()
  }
}
