import Image from 'next/image'
import { Button } from '@/components/ui/button'

const Hero = () => {
  return (
    <section className="flex items-center justify-center w-full px-4 py-8 sm:py-12 bg-white">
      <div className="flex flex-col md:flex-row items-center max-w-6xl w-full bg-background rounded-3xl shadow-lg px-8 sm:px-12 md:px-16">
        {/* Mockup Gambar */}
        <Image
          src="/images/iphone-15-pro-mockup.svg"
          alt="Smartphone with habit tracker app mockup"
          width={400}
          height={800}
          className="w-72 h-auto md:w-96"
          priority
        />

        {/* Konten Teks */}
        <div className="mt-8 md:mt-0 md:ml-12 text-center md:text-right">
          <p className="text-gray-500 text-lg md:text-xl mb-4 max-w-md mx-auto md:mx-0">
            A daily habit tracker that helps you do more, by doing less.
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            THE SIMPLEST HABIT TRACKER
          </h1>
          {/* Tombol */}
          <div className="flex justify-center md:justify-end gap-4">
            <Button
              aria-label="More information"
              className="flex items-center bg-main-black text-white px-6 py-3 rounded-xl hover:bg-opacity-90 transition-all"
            >
              <Image
                src="/icons/Info.svg"
                alt="Info icon"
                width={20}
                height={20}
              />
            </Button>
            <Button
              aria-label="Track Your Habit"
              className="bg-primary text-white px-6 py-3 rounded-xl hover:bg-opacity-90 transition-all"
            >
              Track Your Habit
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
