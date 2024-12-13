import Footer from '@/components/footer'
import Navbar from '@/components/navbar'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <div>
        <section>
          <div>{children}</div>
        </section>
      </div>
      <Footer />
    </main>
  )
}

export default RootLayout
