'use client'

import Image from 'next/image'
import { signIn } from 'next-auth/react'
import React from 'react'

import ROUTES from '@/constants/routes'
import { toast } from '@/hooks/use-toast'

import { Button } from '../ui/button'

const SocialAuthForm = () => {
  const handleSignIn = async (provider: 'google') => {
    try {
      const result = await signIn(provider, {
        callbackUrl: ROUTES.DASHBOARD,
        redirect: false
      })

      if (result?.error) {
        throw new Error(result.error)
      }

      toast({
        title: 'Sign-in Successful',
        description: `You are now signed in with ${provider}.`,
        variant: 'default'
      })
    } catch (error) {
      console.error(error)

      toast({
        title: 'Sign-in Failed',
        description:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred during sign-in.',
        variant: 'destructive'
      })
    }
  }

  return (
    <div className="mt-6 flex flex-col gap-4">
      <Button
        onClick={() => handleSignIn('google')}
        className="flex items-center justify-center w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-lg shadow-sm transition-all duration-300"
      >
        <Image
          src="/icons/google.svg"
          alt="Google Logo"
          width={24}
          height={24}
          className="mr-3"
        />
        <span>Log in with Google</span>
      </Button>
    </div>
  )
}

export default SocialAuthForm
