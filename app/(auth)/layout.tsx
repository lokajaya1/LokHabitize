import Image from 'next/image'
import { ReactNode } from 'react'
import SocialAuthForm from '@/components/forms/SocialAuthForm'

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex items-center justify-center h-screen">
      <div className="flex flex-col lg:flex-row w-full h-full">
        {/* Left Section - Image */}
        <div className="relative hidden lg:block lg:w-1/2 h-full">
          {/* Background Image */}
          <Image
            src="/images/ImgSection.svg"
            alt="Authentication Background"
            layout="fill"
            objectFit="cover"
            priority
            className="absolute inset-0 z-0"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50 z-10" />

          {/* Navigation Buttons */}
          <div className="absolute top-6 left-6 z-20 flex space-x-4">
            <button
              className="
                bg-white/20 text-white
                p-3 rounded-full
                hover:bg-white/30
                focus:outline-none focus:ring-2 focus:ring-white
                transition duration-300
                flex items-center justify-center
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </button>
            <button
              className="
                bg-white/20 text-white
                p-3 rounded-full
                hover:bg-white/30
                focus:outline-none focus:ring-2 focus:ring-white
                transition duration-300
                flex items-center justify-center
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Right Section - Form */}
        <section className="flex w-full lg:w-1/2 h-full bg-white px-6 md:px-12 flex-col justify-center flex-shrink-0">
          {/* Form Wrapper */}
          <div className="w-full max-w-md mx-auto flex flex-col space-y-6 overflow-y-auto">
            {/* Main Form */}
            <div className="flex flex-col items-center justify-center">
              {children}
            </div>

            {/* Social Authentication */}
            <div className="mt-4">
              {/* Divider */}
              <div className="flex items-center">
                <div className="flex-1 border-t border-gray-300"></div>
                <p className="text-center text-gray-500 px-4">
                  Or continue with
                </p>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              {/* Social Auth Form */}
              <SocialAuthForm />
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default AuthLayout
