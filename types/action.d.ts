interface SignInWithOAuthParams {
  provider: 'google'
  providerAccountId: string
  user: {
    email: string
    image: string
    username: string
  }
}

interface AuthCredentials {
  username: string
  email: string
  password: string
}
