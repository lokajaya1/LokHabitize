const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <div>
        <section>
          <div>{children}</div>
        </section>
      </div>
    </main>
  )
}

export default RootLayout
