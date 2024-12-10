import React from 'react'

const Grid = () => {
  return (
    <div className="bg-white flex items-center justify-center min-h-screen py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:grid-rows-2">
          {/* Card 1 - Update Section */}
          <div className="relative lg:row-span-2 flex flex-col items-center overflow-hidden rounded-4xl bg-background p-8">
            <div className="flex items-center justify-between w-full">
              <button className="border border-gray-900 px-4 py-1 rounded-full text-gray-900">
                Update
              </button>
              <p className="text-sm text-gray-600">06/12/2024</p>
              <p className="text-sm text-gray-600">Company update</p>
            </div>
            <h3 className="mt-4 text-3xl font-bold text-gray-900 text-center leading-snug">
              UPDATE <br /> PATCH V.01
            </h3>
            <p className="mt-4 text-gray-600 text-sm text-center">
              Lorem ipsum dolor sit amet consectetur. Erat eget lectus
              consectetur vitae hendrerit cursus auctor ut consequat.
            </p>
            <div className="flex justify-center items-center gap-4 mt-6">
              <button className="bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center">
                {'</>'}
              </button>
              <button className="bg-indigo-600 text-white px-6 py-2 rounded-full">
                DEV
              </button>
              <button className="w-6 h-6 bg-gray-300 rounded-full"></button>
              <button className="w-6 h-6 bg-gray-900 rounded-full"></button>
            </div>
          </div>

          {/* Card 2 - Subscription Section */}
          <div className="relative flex flex-col items-center overflow-hidden rounded-4xl bg-background p-8">
            <h3 className="text-3xl font-bold text-gray-900 text-center leading-snug">
              START DOING IT <br /> EVERY DAY!
            </h3>
            <form className="mt-6 flex items-center justify-center gap-4">
              <input
                type="email"
                placeholder="Email address"
                className="w-full max-w-xs px-4 py-3 bg-gray-200 rounded-lg outline-none text-gray-900"
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg"
              >
                Sign up
              </button>
            </form>
          </div>

          {/* Card 3 - Placeholder */}
          <div className="bg-background rounded-4xl p-8"></div>
        </div>
      </div>
    </div>
  )
}

export default Grid
