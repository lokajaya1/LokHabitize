'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignInSchema, SignUpSchema } from '@/lib/validations'
import {
  signInWithCredentials,
  signUpWithCredentials
} from '@/lib/actions/auth.action'

interface AuthFormProps {
  type: 'sign-in' | 'sign-up'
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(type === 'sign-in' ? SignInSchema : SignUpSchema)
  })

  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: any) => {
    setLoading(true)
    try {
      if (type === 'sign-in') {
        await signInWithCredentials(data)
        alert('Sign in successful!')
      } else {
        await signUpWithCredentials(data)
        alert('Sign up successful!')
      }
    } catch (error) {
      alert(error.message || 'Something went wrong!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-80">
      <input
        {...register('email')}
        type="email"
        placeholder="Email"
        className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-500"
      />
      {errors.email && (
        <p className="text-red-500 text-sm">{errors.email.message}</p>
      )}

      <input
        {...register('password')}
        type="password"
        placeholder="Password"
        className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-500"
      />
      {errors.password && (
        <p className="text-red-500 text-sm">{errors.password.message}</p>
      )}

      {type === 'sign-up' && (
        <input
          {...register('confirmPassword')}
          type="password"
          placeholder="Confirm Password"
          className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-500"
        />
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
        disabled={loading}
      >
        {loading
          ? `${type === 'sign-in' ? 'Signing In' : 'Signing Up'}...`
          : type === 'sign-in'
            ? 'Sign In'
            : 'Sign Up'}
      </button>
    </form>
  )
}

export default AuthForm
