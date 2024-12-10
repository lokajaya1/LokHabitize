import Feature from '@/components/Feature'
import Grid from '@/components/Grid'
import Hero from '@/components/Hero'
import ShowcaseHabit from '@/components/ShowcaseHabit'

const HomePage = () => {
  return (
    <>
      <main>
        <div>
          <Hero />
          <ShowcaseHabit />
          <Feature />
          <Grid />
        </div>
      </main>
    </>
  )
}

export default HomePage
