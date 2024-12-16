// global.d.ts

import { NextResponse } from 'next/server'

// Struktur data utama untuk habit (sesuai proyek LokHabitize)
interface Habit {
  _id: string
  title: string
  description: string
  tags: Tag[]
  author: Author
  createdAt: Date
  updatedAt: Date
  completed: boolean
  progress: number // Persentase progress habit (0-100)
}

// ------------------------
// API Response Types
// ------------------------
type ActionResponse<T = null> = {
  success: boolean
  data?: T
  error?: {
    message: string
    details?: Record<string, string[]>
  }
  status?: number
}

type SuccessResponse<T = null> = ActionResponse<T> & { success: true }
type ErrorResponse = ActionResponse<undefined> & { success: false }

type APIErrorResponse = NextResponse<ErrorResponse>
type APIResponse<T = null> = NextResponse<SuccessResponse<T> | ErrorResponse>

// ------------------------
// Route Parameters
// ------------------------
interface RouteParams {
  params: Promise<Record<string, string>>
  searchParams: Promise<Record<string, string>>
}

interface PaginatedSearchParams {
  page?: number
  pageSize?: number
  query?: string // Optional search query
  filter?: string // Filtering criteria
  sort?: string // Sorting options (asc/desc)
}

// ------------------------
// User Credentials for Auth
// ------------------------
interface AuthCredentials {
  username?: string
  email: string
  password: string
}

interface SessionUser {
  _id: string
  username: string
  email: string
  image?: string
}

// ------------------------
// Habit Creation and Update Payloads
// ------------------------
interface CreateHabitPayload {
  title: string
  description: string
  tags?: string[] // Array of tag IDs
}

interface UpdateHabitPayload {
  title?: string
  description?: string
  tags?: string[]
  progress?: number
  completed?: boolean
}

// ------------------------
// Common Search Params for Pagination
// ------------------------
interface SearchParams {
  page?: number
  pageSize?: number
  query?: string
  sort?: string
  filter?: string
}
