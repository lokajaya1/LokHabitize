import FeatureCard from './cards/FeatureCard'

export default function Home() {
  const features = [
    {
      title: 'SET FLEXIBLE GOALS INSTEAD OF STREAKS',
      description:
        'You might be at the gym finishing off your exercise habit. Mark it as done right there on your mobile. Or perhaps you had an epiphany and you want to make a note of it.',
      image: '/images/macbook-mockup.svg',
      bgColor: 'bg-blue-500',
      reverse: false
    },
    {
      title: 'FULLY RESPONSIVE ON MOBILE.',
      description:
        'You might be at the gym finishing off your exercise habit. Mark it as done right there on your mobile. Or perhaps you had an epiphany and you want to make a note of it.',
      image: '/images/iphone-mockup.svg',
      bgColor: 'bg-green-500',
      reverse: true
    },
    {
      title: 'VISUALIZE YOUR PROGRESS',
      description:
        'Have a quick overview of your goals and streaks in a single beautiful board.',
      image: '/images/macbook-mockup.svg',
      bgColor: 'bg-red-500',
      reverse: false
    }
  ]

  return (
    <main className="container mx-auto px-8 py-16 grid gap-16">
      {features.map((feature, index) => (
        <FeatureCard key={index} {...feature} />
      ))}
    </main>
  )
}
