import type { Mongoose } from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI as string

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined')
}

interface MongooseCache {
  conn: Mongoose | null
  promise: Promise<Mongoose> | null
}

declare global {
  // Allow global mongoose cache for hot reloading in development
  var mongoose: MongooseCache
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

const dbConnect = async (): Promise<Mongoose> => {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const mongoose = await import('mongoose') // Dynamic import to avoid Edge Runtime issues
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: 'LokHabitizeDB'
      })
      .then((result) => {
        console.log('Connected to MongoDB')
        return result
      })
      .catch((error) => {
        console.error('Error connecting to MongoDB', error)
        throw error
      })
  }

  cached.conn = await cached.promise

  return cached.conn
}

export default dbConnect
