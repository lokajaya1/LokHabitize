'use server'

import { Session } from 'next-auth'
import { ZodError, ZodSchema } from 'zod'

import { auth } from '@/auth' // NextAuth instance untuk autentikasi
import dbConnect from '@/lib/mongoose' // Menghubungkan ke MongoDB

import { ValidationError, UnauthorizedError } from '../http-errors'

type ActionOptions<T> = {
  params?: T // Parameter input yang akan divalidasi
  schema?: ZodSchema<T> // Schema Zod untuk validasi
  authorize?: boolean // Apakah user harus di-authenticate
}

// Fungsi utama action untuk:
// 1. Validasi parameter dengan schema Zod
// 2. Autentikasi user (jika `authorize` true)
// 3. Koneksi database MongoDB
// 4. Mengembalikan hasil validasi params dan session user
async function action<T>({
  params,
  schema,
  authorize = false
}: ActionOptions<T>) {
  // 1. Validate params with zod
  if (schema && params) {
    try {
      schema.parse(params)
    } catch (error) {
      if (error instanceof ZodError) {
        return new ValidationError(
          error.flatten().fieldErrors as Record<string, string[]>
        )
      }
      return new Error('Schema validation failed')
    }
  }

  // 2. Check auth user
  let session: Session | null = null

  if (authorize) {
    session = await auth()

    if (!session) {
      return new UnauthorizedError()
    }
  }

  // 3. Connecting to mongoDB
  try {
    await dbConnect()
  } catch (error) {
    console.error('Database connection failed', error)
    throw new Error('Failed to connect to database')
  }

  // 4. Return
  return { params, session }
}

export default action
