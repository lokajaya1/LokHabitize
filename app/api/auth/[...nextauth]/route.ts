import NextAuth, { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare } from 'bcryptjs'
import connectToDatabase from '@/lib/mongoose'
import User from '@/database/user.model'

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
        await connectToDatabase()

        const { email, password } = credentials || {}

        // Cari user berdasarkan email
        const user = await User.findOne({ email })
        if (!user) {
          throw new Error('No user found with the email')
        }

        // Bandingkan password
        const isPasswordValid = await compare(password, user.password)
        if (!isPasswordValid) {
          throw new Error('Invalid credentials')
        }

        // Return data user (hanya id dan email)
        return {
          id: user._id.toString(),
          email: user.email
        }
      }
    })
  ],
  session: {
    strategy: 'jwt' // Menggunakan JSON Web Token
  },
  secret: process.env.NEXTAUTH_SECRET, // Pastikan ini diatur di .env
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
          id: token.id,
          email: token.email
        }
      }
      return session
    }
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
