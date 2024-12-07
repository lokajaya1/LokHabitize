import React from 'react'
import AuthForm from '@/components/forms/AuthForm'

const SignInPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-semibold mb-6">Sign In to LokHabitize</h1>
      <AuthForm type="sign-in" />
    </div>
  )
}

export default SignInPage
