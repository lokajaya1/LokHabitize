import Footer from '@/components/footer'
import Navbar from '@/components/navbar'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <div>
        <Navbar />
        {children}
        <Footer />
      </div>
    </main>
  )
}

export default DashboardLayout
