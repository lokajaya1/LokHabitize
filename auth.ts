import bcrypt from 'bcryptjs'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'

import User from '@/database/user.model'
import { SignInSchema } from '@/lib/validations'
import dbConnect from './lib/mongoose'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),

    Credentials({
      async authorize(credentials) {
        const validatedFields = SignInSchema.safeParse(credentials)
        if (!validatedFields.success) return null

        const { email, password } = validatedFields.data
        await dbConnect()

        const existingUser = await User.findOne({ email })
        if (!existingUser) return null

        const isValidPassword = await bcrypt.compare(
          password,
          existingUser.password
        )
        if (!isValidPassword) return null

        return {
          id: existingUser._id.toString(),
          username: existingUser.username, // Menyertakan username
          email: existingUser.email,
          image: existingUser.image || null
        }
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub
        session.user.username = (token.username as string) || '' // Type assertion di sini
      }
      return session
    },
    async jwt({ token, account, user }) {
      if (user) {
        token.sub = user.id
        token.username = user.username || '' // Pastikan username ditambahkan
      }
      return token
    },
    async signIn({ user, account }) {
      await dbConnect()
      if (account?.provider === 'google') {
        const existingUser = await User.findOne({ email: user.email })
        if (!existingUser) {
          const newUser = new User({
            email: user.email,
            username: user.email?.split('@')[0],
            image: user.image || null
          })
          await newUser.save()
        }
      }
      return true
    }
  },
  pages: {
    signIn: '/auth/signin'
  },
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET
})
