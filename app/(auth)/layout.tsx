const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Content for sign-in or sign-up */}
      {children}
    </div>
  )
}

export default AuthLayout
