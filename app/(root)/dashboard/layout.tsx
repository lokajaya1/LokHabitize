'use client'

import { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'

interface LayoutProps {
  children: ReactNode
}

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <main>
        <div>
          {/* Content after sign-in or sign-up */}
          {children}
        </div>
      </main>
    </SessionProvider>
  )
}

export default DashboardLayout
