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
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = SignInSchema.safeParse(credentials)
        if (!validatedFields.success) {
          return null
        }

        const { email, password } = validatedFields.data

        const { data: existingAccount, success: accountSuccess } =
          (await api.accounts.getByProvider(
            email
          )) as ActionResponse<IAccountDoc>

        if (!accountSuccess || !existingAccount || !existingAccount.password) {
          return null
        }

        const { data: existingUser, success: userSuccess } =
          (await api.users.getById(
            existingAccount.userId.toString()
          )) as ActionResponse<IUserDoc>

        if (!userSuccess || !existingUser) {
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

        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.sub = user.id as string
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.sub as string
      return session
    },
    async signIn({ user, account, profile }) {
      if (account?.type === 'credentials') return true
      if (!account || !user) return false

      // Prepare user information for OAuth
      const userInfo = {
        name: user.name!,
        email: user.email!,
        image: user.image!,
        username:
          account.provider === 'google'
            ? (user.email?.split('@')[0] as string)
            : (user.name?.toLowerCase() as string)
      }

      // Save OAuth user and provider data to database
      const { success } = (await api.auth.oAuthSignIn({
        user: userInfo,
        provider: account.provider as 'google',
        providerAccountId: account.providerAccountId
      })) as ActionResponse

      if (!success) return false

      return true
    }
  }
})
