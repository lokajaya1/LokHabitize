import React from 'react'
import AuthForm from '@/components/forms/AuthForm'

const SignUpPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-semibold mb-6">Sign Up for LokHabitize</h1>
      <AuthForm type="sign-up" />
    </div>
  )
}

export default SignUpPage
