import React from 'react'
import Image from 'next/image'

const Content: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
        <div className="flex flex-col items-center">
          <div className="bg-blue-500 rounded-lg p-4">
            {/* <Image
              src="/placeholder-laptop.jpg"
              alt="Laptop on blue background"
              width={400}
              height={300}
              className="rounded-lg"
            /> */}
          </div>
          <div className="flex items-center mt-4">
            <button className="border border-black px-4 py-2 rounded-full">
              BETA
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold">
            SET FLEXIBLE GOALS INSTEAD OF STREAKS
          </h2>
          <p className="mt-4 text-gray-700">
            You might be at the gym finishing off your exercise habit. Mark it
            as done right there on your mobile. Or perhaps you had an epiphany
            and you want to make a note of it.
          </p>
        </div>
        <div className="flex flex-col justify-center order-last md:order-none">
          <h2 className="text-3xl font-bold">FULLY RESPONSIVE ON MOBILE.</h2>
          <p className="mt-4 text-gray-700">
            You might be at the gym finishing off your exercise habit. Mark it
            as done right there on your mobile. Or perhaps you had an epiphany
            and you want to make a note of it.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-green-500 rounded-lg p-4">
            {/* <Image
              src="/placeholder-mobile.jpg"
              alt="Mobile phone on green background"
              width={400}
              height={300}
              className="rounded-lg"
            /> */}
          </div>
          <div className="flex items-center mt-4">
            <button className="border border-black px-4 py-2 rounded-full">
              BETA
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-red-500 rounded-lg p-4">
            {/* <Image
              src="/placeholder-laptop-red.jpg"
              alt="Laptop on red background"
              width={400}
              height={300}
              className="rounded-lg"
            /> */}
          </div>
          <div className="flex items-center mt-4">
            <button className="border border-black px-4 py-2 rounded-full">
              BETA
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold">VISUALIZE YOUR PROGRESS</h2>
          <p className="mt-4 text-gray-700">
            Have a quick overview of your goals and streaks in a single
            beautiful board
          </p>
        </div>
      </div>
    </div>
  )
}

export default Content
