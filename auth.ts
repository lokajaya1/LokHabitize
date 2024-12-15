import bcrypt from 'bcryptjs'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

import { SignInSchema } from '@/lib/validations' // Validasi input saat login
import { api } from '@/lib/api' // API calls ke backend
import { IAccountDoc } from '@/database/account.model' // Tipe data untuk akun
import { IUserDoc } from '@/database/user.model' // Tipe data untuk user
import { ActionResponse } from './types/global'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    // Google OAuth Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),

    // Credentials Provider untuk login manual
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'example@mail.com'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // Validasi input credentials
        const validatedFields = SignInSchema.safeParse(credentials)

        if (!validatedFields.success) return null

        const { email, password } = validatedFields.data

        // Panggil API untuk mendapatkan akun pengguna berdasarkan email
        const { data: existingAccount } = (await api.accounts.getByProvider(
          email
        )) as ActionResponse<IAccountDoc>

        if (!existingAccount) return null

        // Panggil API untuk mendapatkan data user berdasarkan ID akun
        const { data: existingUser } = (await api.users.getById(
          existingAccount.userId.toString()
        )) as ActionResponse<IUserDoc>

        if (!existingUser) return null

        // Bandingkan password hash dengan input user
        const isValidPassword = await bcrypt.compare(
          password,
          existingAccount.password!
        )

        if (!isValidPassword) return null

        // Return user jika autentikasi sukses
        return {
          id: existingUser.id,
          name: existingUser.name,
          email: existingUser.email,
          image: existingUser.image,
          username: existingUser.username
        }
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      // Tambahkan `id` dan `username` ke sesi
      session.user.id = token.sub as string
      session.user.username = token.username as string
      return session
    },
    async jwt({ token, account }) {
      // Jika autentikasi menggunakan akun baru, tambahkan userId
      if (account) {
        const { data: existingAccount } = (await api.accounts.getByProvider(
          account.type === 'credentials'
            ? token.email!
            : account.providerAccountId
        )) as ActionResponse<IAccountDoc>

        if (existingAccount) {
          token.sub = existingAccount.userId.toString()
          token.username = existingAccount.username
        }
      }
      return token
    },
    async signIn({ user, account, profile }) {
      if (account?.type === 'credentials') return true

      if (!account || !user) return false

      const userInfo = {
        name: user.name!,
        email: user.email!,
        image: user.image || null,
        username:
          account.provider === 'google'
            ? (user.name?.toLowerCase().replace(/\s+/g, '') as string)
            : undefined
      }

      // Kirim data ke backend untuk OAuth login
      const { success } = (await api.auth.oAuthSignIn({
        user: userInfo,
        provider: account.provider as 'google',
        providerAccountId: account.providerAccountId
      })) as ActionResponse

      return success
    }
  },
  pages: {
    signIn: '/auth/signin', // Halaman custom sign-in
    error: '/auth/error' // Halaman error custom
  },
  session: {
    strategy: 'jwt'
  }
})
