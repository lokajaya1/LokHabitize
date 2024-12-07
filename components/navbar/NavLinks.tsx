import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

const NavLinks = () => {
  return (
    <div className="hidden md:flex items-center space-x-4">
      <Button className="bg-black text-white p-2 rounded-xl">
        <Image src="/icons/globe.svg" alt="Globe Icon" width={18} height={18} />
      </Button>
      <Button className="bg-black text-white p-2 rounded-xl">
        <Image
          src="/icons/circle-plus.svg"
          alt="Plus Icon"
          width={18}
          height={18}
        />
      </Button>

      <Link
        href="/sign-in"
        className="bg-white text-black border border-gray-300 px-4 py-2 rounded-xl hover:bg-blue-100 text-sm"
      >
        Sign In
      </Link>

      {/* Sign Up */}
      <Link
        href="/sign-up"
        className="bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary-dark text-sm"
      >
        Sign Up
      </Link>

      <Button className="bg-black text-white p-2 rounded-xl">
        <Image
          src="/icons/three-dots.svg"
          alt="Ellipsis Icon"
          width={8}
          height={18}
        />
      </Button>
    </div>
  )
}

export default NavLinks
