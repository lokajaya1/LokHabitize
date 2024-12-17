// Interface untuk SignIn dengan OAuth
interface SignInWithOAuthParams {
  provider: 'google' // Hanya Google digunakan
  providerAccountId: string
  user: {
    email: string
    image: string | null | undefined
    username: string
  }
}

// Interface untuk Credentials Authentication
interface AuthCredentials {
  username: string
  email: string
  password: string
}

// Interface untuk membuat pertanyaan
interface CreateQuestionParams {
  title: string // Judul pertanyaan
  content: string // Konten pertanyaan
  tags: string[] // Array tag yang terkait dengan pertanyaan
}

// Interface untuk membuat habit (kebiasaan)
interface CreateHabitParams {
  title: string // Judul kebiasaan
  description?: string // Deskripsi kebiasaan (opsional)
  frequency: 'daily' | 'weekly' | 'monthly' // Frekuensi habit
}

// Interface untuk menyelesaikan habit
interface CompleteHabitParams {
  habitId: string // ID habit yang akan diselesaikan
  completionDate: string // Tanggal habit selesai (ISO string format)
}

// Interface untuk mengambil statistik habit
interface GetHabitStatsParams {
  habitId: string // ID habit yang diambil statistiknya
}
