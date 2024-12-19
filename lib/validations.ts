import { z } from 'zod'

// Schema untuk validasi Login
export const SignInSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Please provide a valid email address.' }),

  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long.' })
    .max(100, { message: 'Password cannot exceed 100 characters.' })
})

// Schema untuk validasi Registrasi
export const SignUpSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters long.' })
    .max(30, { message: 'Username cannot exceed 30 characters.' })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: 'Username can only contain letters, numbers, and underscores.'
    }),

  email: z
    .string()
    .min(1, { message: 'Email is required.' })
    .email({ message: 'Please provide a valid email address.' }),

  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long.' })
    .max(100, { message: 'Password cannot exceed 100 characters.' })
})

// Schema untuk validasi data User
export const UserSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters long.' }),
  email: z.string().email({ message: 'Please provide a valid email address.' }),
  image: z.string().url({ message: 'Please provide a valid URL.' }).optional()
})

// Schema untuk validasi data Akun
export const AccountSchema = z.object({
  userId: z.string().min(1, { message: 'User ID is required.' }),
  image: z.string().url({ message: 'Please provide a valid URL.' }).optional(),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long.' })
    .max(100, { message: 'Password cannot exceed 100 characters.' })
    .optional(),
  provider: z.string().min(1, { message: 'Provider is required.' }),
  providerAccountId: z
    .string()
    .min(1, { message: 'Provider Account ID is required.' })
})

// Schema untuk validasi Login menggunakan OAuth
export const SignInWithOAuthSchema = z.object({
  provider: z.enum(['google']), // Tambahkan provider lain jika diperlukan
  providerAccountId: z
    .string()
    .min(1, { message: 'Provider Account ID is required.' }),
  user: z.object({
    username: z
      .string()
      .min(3, { message: 'Username must be at least 3 characters long.' }),
    email: z
      .string()
      .email({ message: 'Please provide a valid email address.' }),
    image: z.string().url('Invalid image URL').optional()
  })
})

// Schema untuk validasi pembuatan Habit
export const HabitCreateSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title is required.' })
    .max(100, { message: 'Title cannot exceed 100 characters.' }),
  goal: z
    .number()
    .min(1, { message: 'Goal must be at least 1.' })
    .max(100, { message: 'Goal cannot exceed 100.' }),
  repeat: z.enum(['Daily', 'Weekly', 'Monthly'], {
    message: 'Repeat must be one of Daily, Weekly, or Monthly.'
  }),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Start date must be in YYYY-MM-DD format.'
  }),
  location: z.string().optional(),
  duration: z.number().min(1, { message: 'Duration must be at least 1.' }),
  durationUnit: z.enum(['Mins', 'Hours', 'Times', 'Km', 'M']),
  reminder: z
    .string()
    .regex(/^\d{2}:\d{2}$/, {
      message: 'Reminder must be in HH:MM format.'
    })
    .optional()
})

// Schema untuk validasi pembaruan Habit
export const HabitUpdateSchema = HabitCreateSchema.partial()
