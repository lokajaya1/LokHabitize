import Content from '@/components/Content'
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
          <Content />
          <Grid />
        </div>
      </main>
    </>
  )
}

export default HomePage
