import Navbar from '@/components/navbar'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <div>
        <Navbar />
        {children}
      </div>
    </main>
  )
}

export default DashboardLayout
