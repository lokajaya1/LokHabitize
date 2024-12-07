import Navbar from '@/components/navbar'
import React from 'react'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Navbar />
      <div>
        <section>
          <div>{children}</div>
        </section>
      </div>
    </main>
  )
}

export default RootLayout
