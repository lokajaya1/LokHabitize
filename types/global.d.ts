// global.d.ts

import { NextResponse } from 'next/server'

// ------------------------
// Struktur data utama untuk Habit
// ------------------------
interface Habit {
  _id: string
  title: string
  description: string
  tags: Tag[] // Relasi dengan tag
  author: Author // Relasi dengan penulis
  createdAt: Date
  updatedAt: Date
  completed: boolean // Status selesai atau tidak
  progress: number // Persentase progress habit (0-100)
  goal: number // Target yang ingin dicapai
  repeat: 'Daily' | 'Weekly' | 'Monthly' // Frekuensi habit
  startDate: string // Format YYYY-MM-DD
  location?: string // Lokasi opsional
  duration: number // Durasi habit
  durationUnit: 'Mins' | 'Hours' // Unit durasi
  reminder?: string // Format HH:MM
}

// Struktur data untuk Tag
interface Tag {
  _id: string
  name: string
  color?: string // Warna opsional untuk tag
}

// Struktur data untuk Author
interface Author {
  _id: string
  username: string
  email: string
  image?: string // Foto profil opsional
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
  goal: number // Target untuk habit
  repeat: 'Daily' | 'Weekly' | 'Monthly' // Frekuensi habit
  startDate: string // Format YYYY-MM-DD
  location?: string // Lokasi opsional
  duration: number // Durasi habit
  durationUnit: 'Mins' | 'Hours' // Unit durasi
  reminder?: string // Format HH:MM opsional
}

interface UpdateHabitPayload {
  title?: string
  description?: string
  tags?: string[]
  progress?: number
  completed?: boolean
  goal?: number
  repeat?: 'Daily' | 'Weekly' | 'Monthly'
  startDate?: string
  location?: string
  duration?: number
  durationUnit?: 'Mins' | 'Hours'
  reminder?: string
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
