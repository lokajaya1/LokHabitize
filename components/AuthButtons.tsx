import Link from 'next/link'
import React from 'react'

const AuthButtons = () => {
  return (
    <div className="hidden md:flex space-x-4">
      {/* Sign In */}
      <Link
        href="/sign-in"
        className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-100"
      >
        Sign In
      </Link>

      {/* Sign Up */}
      <Link
        href="/sign-up"
        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
      >
        Sign Up
      </Link>
    </div>
  )
}

export default AuthButtons
