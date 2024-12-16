import { fetchHandler } from './handlers/fetch'

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api'

export const api = {
  auth: {
    // Sign-in menggunakan username/email dan password
    signIn: (credentials: { email: string; password: string }) =>
      fetchHandler(`${API_BASE_URL}/auth/signin`, {
        method: 'POST',
        body: JSON.stringify(credentials)
      }),

    // Sign-out pengguna
    signOut: () =>
      fetchHandler(`${API_BASE_URL}/auth/signout`, { method: 'POST' })
  },

  users: {
    // Mengambil semua pengguna (opsional, hanya untuk admin jika diperlukan)
    getAll: () => fetchHandler(`${API_BASE_URL}/users`),

    // Mengambil data pengguna berdasarkan ID
    getById: (id: string) => fetchHandler(`${API_BASE_URL}/users/${id}`),

    // Membuat pengguna baru (registrasi)
    create: (userData: { username: string; email: string; password: string }) =>
      fetchHandler(`${API_BASE_URL}/users`, {
        method: 'POST',
        body: JSON.stringify(userData)
      }),

    // Memperbarui data pengguna
    update: (
      id: string,
      userData: { username?: string; email?: string; password?: string }
    ) =>
      fetchHandler(`${API_BASE_URL}/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(userData)
      }),

    // Menghapus pengguna berdasarkan ID
    delete: (id: string) =>
      fetchHandler(`${API_BASE_URL}/users/${id}`, { method: 'DELETE' })
  }
}
