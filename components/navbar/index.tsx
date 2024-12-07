import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import NavLinks from './NavLinks'
import MobileNav from './MobileNav'

const Navbar = () => {
  return (
    <header className="bg-white shadow-md p-4">
      <nav className="container mx-auto flex items-center justify-between">
        <NavLinks />

        <Link
          href="/"
          aria-label="LokHabitize Home"
          className="flex items-center gap-1"
        >
          <Image
            src="/icons/lokhabitize.svg"
            width={60}
            height={40}
            alt="LokHabitize Logo"
            priority
          />
          <p className="text-xl font-bold text-blue-600 hidden md:block">
            LokHabitize
          </p>
        </Link>

        <MobileNav />
      </nav>
    </header>
  )
}

export default Navbar
