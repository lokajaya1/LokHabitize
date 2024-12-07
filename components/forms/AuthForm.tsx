'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import {
  signUpWithCredentials,
  signInWithCredentials
} from '@/lib/actions/auth.action'
import { SignInSchema, SignUpSchema } from '@/lib/validations'

type FormData = {
  email: string
  password: string
}

interface AuthFormProps {
  type: 'sign-in' | 'sign-up'
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [error, setError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(type === 'sign-in' ? SignInSchema : SignUpSchema)
  })

  const onSubmit = async (data: FormData) => {
    try {
      if (type === 'sign-up') {
        await signUpWithCredentials(data.email, data.password)
        alert('Sign up successful!')
      } else {
        await signInWithCredentials(data.email, data.password)
        alert('Sign in successful!')
      }
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          className="input"
          {...register('email')}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          className="input"
          {...register('password')}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>
      <button type="submit" className="btn-primary">
        {type === 'sign-in' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  )
}

export default AuthForm
