/* eslint-disable camelcase */
import type { Metadata } from 'next'
import { Fira_Code, Inter, Poppins } from 'next/font/google'
import React, { ReactNode } from 'react'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  weight: ['400', '500', '700']
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'LokHabitize',
  description:
    'Track your habits effortlessly with LokHabitize. Gamify your routines and stay productive every day.',
  icons: {
    icon: '/images/lokhabitize.svg'
  }
}

const RootLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} ${firaCode.variable}`}
    >
      <body className="bg-background font-sans antialiased text-gray-800">
        {children}
      </body>
    </html>
  )
}

export default RootLayout
