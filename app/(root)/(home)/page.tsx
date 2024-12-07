import Image from 'next/image'
import { Button } from '@/components/ui/button'

const HomePage = () => {
  return (
    <>
      <main className="flex w-full items-center justify-center p-4 sm:flex-row sm:items-center bg-white">
        <div className="bg-background rounded-3xl shadow-lg px-12 md:px-16 flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12 w-full max-w-6xl">
          {/* Gambar Mockup */}
          <Image
            src="/images/iphone-15-pro-mockup.svg"
            alt="Smartphone with blank screen"
            width={400}
            height={800}
            className="w-72 h-auto md:w-96"
            priority
          />

          {/* Konten Teks */}
          <div className="flex flex-col items-end text-right space-y-4">
            <p className="text-gray-500 text-lg md:text-xl max-w-md">
              a daily habit tracker that helps you do more, by doing less.
            </p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              THE SIMPLEST HABIT TRACKER
            </h1>

            {/* Tombol */}
            <div className="flex gap-4 justify-end mt-6">
              <Button className="flex items-center bg-main-black text-white px-6 py-3 rounded-xl">
                <Image
                  src="/icons/Info.svg"
                  alt="info icon"
                  width={20}
                  height={20}
                />
              </Button>
              <Button className="flex items-center bg-primary text-white px-6 py-3 rounded-xl">
                Track Your Habit
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default HomePage
