import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-16 px-8 rounded-t-[2rem]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-between space-y-12 lg:space-y-0">
        {/* Left Section */}
        <div className="text-center lg:text-left">
          <h2 className="text-4xl font-extrabold text-white leading-snug">
            THE SIMPLEST <br /> HABIT TRACKER
          </h2>
          <form className="mt-8 flex items-center justify-center lg:justify-start">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 px-4 py-3 text-gray-900 rounded-l-full outline-none focus:ring-2 focus:ring-indigo-600 placeholder-gray-400"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-3 rounded-r-full hover:bg-indigo-700"
            >
              →
            </button>
          </form>
          <p className="mt-3 text-sm text-gray-400">
            Subscribe to our newsletter.
          </p>
        </div>

        {/* Right Section */}
        <div className="grid grid-cols-3 gap-12 text-sm text-center lg:text-left">
          {/* Product Section */}
          <div>
            <h3 className="font-semibold text-white">PRODUCT</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="hover:text-gray-300">
                  Feature
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Devices
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Sign up
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Log in
                </a>
              </li>
            </ul>
          </div>

          {/* Company Section */}
          <div>
            <h3 className="font-semibold text-white">COMPANY</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="hover:text-gray-300">
                  About us
                </a>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="font-semibold text-white">SUPPORT</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="hover:text-gray-300">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
