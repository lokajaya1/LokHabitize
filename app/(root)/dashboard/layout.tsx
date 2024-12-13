const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <div>
        {/* Content after sign-in or sign-up */}
        {children}
      </div>
    </main>
  )
}

export default DashboardLayout
