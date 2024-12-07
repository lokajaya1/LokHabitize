import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import NavLinks from './NavLinks'
import MobileNav from './MobileNav'
import AuthButtons from '../AuthButtons'

const Navbar = () => {
  return (
    <header className="bg-background shadow-md">
      <nav className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link
          href="/"
          aria-label="LokHabitize Home"
          className="flex items-center gap-1"
        >
          <Image
            src="/images/lokhabitize.svg"
            width={80}
            height={40}
            alt="LokHabitize Logo"
            priority
          />
          <p className="text-xl font-bold text-blue-600 hidden md:block">
            LokHabitize
          </p>
        </Link>

        {/* Navigation Links */}
        <NavLinks />

        {/* Auth Buttons */}
        <AuthButtons />

        {/* Mobile Navigation */}
        <MobileNav />
      </nav>
    </header>
  )
}

export default Navbar
