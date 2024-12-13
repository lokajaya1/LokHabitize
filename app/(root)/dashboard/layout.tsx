const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <div>
        {/* Content for sign-in or sign-up */}
        {children}
      </div>
    </main>
  )
}

export default DashboardLayout
