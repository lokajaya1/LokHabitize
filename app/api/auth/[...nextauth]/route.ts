import NextAuth, { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare } from 'bcryptjs'
import connectToDatabase from '@/lib/mongoose'
import User, { IUser } from '@/database/user.model'

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required')
        }

        await connectToDatabase()

        const user = (await User.findOne({
          email: credentials.email
        })) as IUser | null
        if (!user) {
          throw new Error('No user found with the email')
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        )
        if (!isPasswordValid) {
          throw new Error('Invalid credentials')
        }

        return {
          id: user.id.toString(),
          email: user.email
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id as string
        }
      }
      return session
    }
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
