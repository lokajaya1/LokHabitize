import bcrypt from 'bcryptjs'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'

import { IAccountDoc } from './database/account.model'
import { IUserDoc } from './database/user.model'
import { api } from './lib/api'
import { SignInSchema } from './lib/validations'
import { ActionResponse } from './types/global'

const isDev = process.env.NODE_ENV === 'development'
const log = (...args: any[]) => isDev && console.log(...args)

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      async authorize(credentials) {
        log('Credentials input:', credentials)

        const validatedFields = SignInSchema.safeParse(credentials)
        if (!validatedFields.success) {
          log('Input validation failed:', validatedFields.error)
          return null
        }

        const { email, password } = validatedFields.data

        const { data: existingAccount, success: accountSuccess } =
          (await api.accounts.getByProvider(
            email
          )) as ActionResponse<IAccountDoc>

        if (!accountSuccess || !existingAccount || !existingAccount.password) {
          log('Account not found or invalid for email:', email)
          return null
        }

        const { data: existingUser, success: userSuccess } =
          (await api.users.getById(
            existingAccount.userId.toString()
          )) as ActionResponse<IUserDoc>

        if (!userSuccess || !existingUser) {
          log('User not found for userId:', existingAccount.userId)
          return null
        }

        const isValidPassword = await bcrypt.compare(
          password,
          existingAccount.password!
        )

        if (isValidPassword) {
          return {
            id: existingUser.id,
            email: existingUser.email,
            name: existingUser.username,
            username: existingUser.username,
            image: existingUser.image
          }
        }

        log('Invalid password for user:', existingUser.email)
        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id as string
      }
      return token
    },
    async session({ session, token }) {
      console.log('Session before modification:', session)
      console.log('Token:', token)

      session.user.id = token.sub as string
      session.user.name = token.username as string
      return session
    }
  }
})
