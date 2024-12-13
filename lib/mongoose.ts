import mongoose from 'mongoose'

// URL koneksi ke MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'your_mongodb_connection_string'

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable')
}

// Gunakan cache global untuk mencegah koneksi ulang di lingkungan pengembangan
interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  // Tambahkan tipe untuk cache agar TypeScript tidak menghasilkan error
  var mongoose: MongooseCache
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI)
      .then((mongooseInstance) => mongooseInstance)
  }

  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect
