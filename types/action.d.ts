// Interface untuk SignIn dengan OAuth
export interface SignInWithOAuthParams {
  provider: 'google' // Hanya Google digunakan
  providerAccountId: string
  user: {
    email: string
    image: string
    username: string
  }
}

// Interface untuk Credentials Authentication
export interface AuthCredentials {
  username: string
  email: string
  password: string
}

// Interface untuk membuat pertanyaan
export interface CreateQuestionParams {
  title: string // Judul pertanyaan
  content: string // Konten pertanyaan
  tags: string[] // Array tag yang terkait dengan pertanyaan
}

// Interface untuk membuat habit (kebiasaan)
export interface CreateHabitParams {
  title: string // Judul kebiasaan
  description?: string // Deskripsi kebiasaan (opsional)
  frequency: 'daily' | 'weekly' | 'monthly' // Frekuensi habit
}

// Interface untuk menyelesaikan habit
export interface CompleteHabitParams {
  habitId: string // ID habit yang akan diselesaikan
  completionDate: string // Tanggal habit selesai (ISO string format)
}

// Interface untuk mengambil statistik habit
export interface GetHabitStatsParams {
  habitId: string // ID habit yang diambil statistiknya
}
