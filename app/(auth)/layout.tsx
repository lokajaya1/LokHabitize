import Image from 'next/image'
import { ReactNode } from 'react'
import SocialAuthForm from '@/components/forms/SocialAuthForm'
import { Button } from '@/components/ui/button'

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
            fill
            priority
            style={{ objectFit: 'cover' }}
            className="absolute inset-0 z-0"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50 z-10" />

          {/* Navigation Buttons */}
          <div className="absolute top-6 left-6 z-20 flex space-x-4">
            {/* Tombol Panah Kiri */}
            <Button className="bg-primary text-white hover:bg-primary-dark">
              <Image
                src="/icons/arrow_back.svg"
                alt="Arrow Back"
                width={18}
                height={18}
              />
            </Button>

            {/* Tombol Tiga Titik */}
            <Button className="bg-main-black text-white p-2 rounded-xl hover:bg-primary-dark">
              <Image
                src="/icons/three-dots.svg"
                alt="Ellipsis Icon"
                width={8}
                height={18}
              />
            </Button>
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
