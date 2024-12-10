import FeatureCard from './cards/FeatureCard'

export default function Home() {
  const features = [
    {
      title: 'SET FLEXIBLE GOALS INSTEAD OF STREAKS',
      description:
        'You might be at the gym finishing off your exercise habit. Mark it as done right there on your mobile. Or perhaps you had an epiphany and you want to make a note of it.',
      image:
        'https://storage.googleapis.com/a1aa/image/3pdiELKavoqJJxbhYIle4g55i0nyeEPCUyJM5bn0CSuV3k5TA.jpg',
      bgColor: 'bg-blue-500',
      reverse: false
    },
    {
      title: 'FULLY RESPONSIVE ON MOBILE.',
      description:
        'You might be at the gym finishing off your exercise habit. Mark it as done right there on your mobile. Or perhaps you had an epiphany and you want to make a note of it.',
      image:
        'https://storage.googleapis.com/a1aa/image/VUpbDBseNvQdIatY2MwJWS2IWDwKFKZ30Wacl9vWZJrpby8JA.jpg',
      bgColor: 'bg-green-500',
      reverse: true
    },
    {
      title: 'VISUALIZE YOUR PROGRESS',
      description:
        'Have a quick overview of your goals and streaks in a single beautiful board.',
      image:
        'https://storage.googleapis.com/a1aa/image/vpy5fjgNWKxtJqfZYXLluWklFevKh84CFcTUeNDHtKjGdTmPB.jpg',
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
