import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <section>
        <div>
          <div>
            <h1>Join LokHabitize</h1>
            <p></p>
          </div>
        </div>
        {children}
      </section>
    </main>
  )
}

export default AuthLayout
