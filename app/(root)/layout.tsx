import Navbar from '@/components/navbar'

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
