'use client'
import React, { useState } from 'react'
import Link from 'next/link'

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Hamburger Menu Button */}
      <button
        type="button"
        className="md:hidden block text-gray-700 focus:outline-none"
        onClick={toggleMenu}
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
          />
        </svg>
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md z-10">
          <ul className="flex flex-col space-y-4 p-4 text-gray-700">
            <li>
              <Link href="/features" className="hover:text-blue-600">
                Features
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="hover:text-blue-600">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-blue-600">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-blue-600">
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-100"
              >
                Log In
              </Link>
            </li>
            <li>
              <Link
                href="/signup"
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  )
}

export default MobileNav
