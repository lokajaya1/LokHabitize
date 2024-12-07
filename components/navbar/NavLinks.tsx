import Link from 'next/link'
import React from 'react'

const NavLinks = () => {
  return (
    <ul className="hidden md:flex space-x-8 text-gray-700">
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
    </ul>
  )
}

export default NavLinks
