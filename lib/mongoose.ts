import mongoose from 'mongoose'

if (!process.env.MONGODB_URI) {
  throw new Error('The MONGODB_URI environment variable is not defined in .env')
}

const MONGODB_URI = process.env.MONGODB_URI

// Gunakan cache untuk koneksi Mongoose
let cached = global.mongooseConnection

if (!cached) {
  cached = global.mongooseConnection = { conn: null, promise: null }
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI) // Tidak perlu opsi tambahan
      .then((mongoose) => {
        console.log('Connected to MongoDB')
        return mongoose
      })
      .catch((err) => {
        console.error('Failed to connect to MongoDB:', err)
        throw err
      })
  }

  try {
    cached.conn = await cached.promise
  } catch (err) {
    cached.promise = null // Reset jika koneksi gagal
    throw err
  }

  return cached.conn
}

export default connectToDatabase
