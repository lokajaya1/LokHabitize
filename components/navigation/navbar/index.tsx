import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav>
      <Link href="/">
        <Image
          src="/images/lokhabitize.svg"
          width={20}
          height={20}
          alt="LokHabitize Logo"
        />
      </Link>
    </nav>
  )
}

export default Navbar
