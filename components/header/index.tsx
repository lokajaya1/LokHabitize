'use client'

import Link from 'next/link'
import Image from 'next/image'

import { useSession } from 'next-auth/react' // Menggunakan useSession dari next-auth
import UserAvatar from '@/components/UserAvatar' // Komponen UserAvatar

const Header = () => {
  const { data: session, status } = useSession() // Menggunakan hook useSession

  // Menunggu session selesai loading
  if (status === 'loading') {
    return <div>Loading...</div> // Menampilkan loading state saat session sedang dimuat
  }

  return (
    <div className="flex justify-between items-center mb-6">
      {/* Bagian Kiri - Avatar User dan Ikon */}
      <div className="flex items-center space-x-4">
        {/* Gunakan komponen UserAvatar */}
        {session?.user?.id ? (
          <UserAvatar
            id={session.user.id}
            username={session.user.name!}
            imageUrl={session.user?.image}
          />
        ) : (
          // Avatar default jika user tidak login
          <div className="h-10 w-10 rounded-full overflow-hidden">
            <Image
              src="/icons/avatar.svg"
              alt="Default avatar"
              width={40}
              height={40}
              loading="lazy"
              className="object-cover"
            />
          </div>
        )}

        {/* Ikon Lonceng */}
        <div className="w-10 h-10 flex justify-center items-center">
          <i className="fas fa-bell text-xl text-gray-600"></i>
        </div>

        {/* Ikon Menu */}
        <div className="w-10 h-10 flex justify-center items-center">
          <i className="fas fa-ellipsis-v text-xl text-gray-600"></i>
        </div>
      </div>

      {/* Bagian Tengah - Logo */}
      <div className="text-2xl font-bold text-gray-800">
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
      </div>
    </div>
  )
}

export default Header
