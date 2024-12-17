import bcrypt from 'bcryptjs'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'

import { IAccountDoc } from './database/account.model'
import { IUserDoc } from './database/user.model'
import { api } from './lib/api'
import { SignInSchema } from './lib/validations'
import { ActionResponse } from './types/global'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      async authorize(credentials) {
        console.log('Credentials input:', credentials)

        // Validasi input menggunakan SignInSchema
        const validatedFields = SignInSchema.safeParse(credentials)
        if (!validatedFields.success) {
          console.log('Input validation failed:', validatedFields.error)
          return null
        }

        const { email, password } = validatedFields.data
        console.log('Validated fields:', { email, password })

        // Cek akun berdasarkan email
        const { data: existingAccount } = (await api.accounts.getByProvider(
          email
        )) as ActionResponse<IAccountDoc>
        console.log('Existing account:', existingAccount)

        if (!existingAccount) {
          console.log('Account not found for email:', email)
          return null
        }

        // Ambil data user berdasarkan ID
        const { data: existingUser } = (await api.users.getById(
          existingAccount.userId.toString()
        )) as ActionResponse<IUserDoc>
        console.log('Existing user:', existingUser)

        if (!existingUser) {
          console.log('User not found for userId:', existingAccount.userId)
          return null
        }

        // Bandingkan password
        const isValidPassword = await bcrypt.compare(
          password,
          existingAccount.password!
        )
        console.log('Password validation result:', isValidPassword)

        if (isValidPassword) {
          console.log('Successful sign-in for user:', existingUser.email)
          return {
            id: existingUser.id,
            email: existingUser.email,
            username: existingUser.username, // Ganti name ke username
            image: existingUser.image
          }
        } else {
          console.log('Invalid password for user:', existingUser.email)
        }

        return null
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      console.log('Session callback - token:', token)
      session.user.id = token.sub as string
      console.log('Session object:', session)
      return session
    },
    async jwt({ token, account }) {
      console.log('JWT callback - token:', token, 'account:', account)

      if (account) {
        const { data: existingAccount, success } =
          (await api.accounts.getByProvider(
            account.type === 'credentials'
              ? token.email!
              : account.providerAccountId
          )) as ActionResponse<IAccountDoc>

        console.log('Account fetched in JWT callback:', existingAccount)

        if (!success || !existingAccount) {
          console.log('Failed to fetch account in JWT callback')
          return token
        }

        const userId = existingAccount.userId
        if (userId) {
          token.sub = userId.toString()
          console.log('Token updated with userId:', token.sub)
        }
      }

      return token
    },
    async signIn({ user, account }) {
      console.log('SignIn callback - user:', user, 'account:', account)

      if (account?.type === 'credentials') {
        console.log('Sign-in with credentials')
        return true
      }
      if (!account || !user) {
        console.log('Missing account or user during sign-in')
        return false
      }

      // Siapkan data user untuk OAuth sign-in
      const userInfo = {
        email: user.email!,
        username: user.email!.split('@')[0], // Default username dari email sebelum @
        image: user.image
      }
      console.log('User info for OAuth:', userInfo)

      // Kirim data user ke API
      const { success } = (await api.auth.oAuthSignIn({
        user: userInfo,
        provider: account.provider as 'google',
        providerAccountId: account.providerAccountId
      })) as ActionResponse

      console.log('OAuth sign-in API response:', success)

      if (!success) {
        console.log('OAuth sign-in failed')
        return false
      }

      console.log('OAuth sign-in successful')
      return true
    }
  }
})
