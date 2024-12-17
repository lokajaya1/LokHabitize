// next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      username: string
      email: string
      image?: string
    } & DefaultSession['user']
  }

  interface User {
    id: string
    username: string
    email: string
    image?: string
  }
}
