interface SignInWithOAuthParams {
  provider: 'google'
  providerAccountId: string
  user: {
    username: string
    email: string
    image: string
  }
}

interface AuthCredentials {
  username: string
  email: string
  password: string
}
