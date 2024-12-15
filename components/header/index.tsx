import Link from 'next/link'
import Image from 'next/image'

import { auth } from '@/auth' // Mengambil session user
import UserAvatar from '@/components/UserAvatar' // Komponen UserAvatar

const Header = async () => {
  const session = await auth() // Ambil sesi autentikasi user

  return (
    <div className="flex justify-between items-center mb-6">
      {/* Bagian Kiri - Avatar User dan Ikon */}
      <div className="flex items-center space-x-4">
        {/* Gunakan komponen UserAvatar */}
        {session?.user?.id ? (
          <UserAvatar
            id={session.user.id} // ID user dari session
            username={session.user.username || 'user'} // Username (fallback)
            imageUrl={session.user.image || null} // URL gambar user
          />
        ) : (
          // Avatar default jika user tidak login
          <Image
            src="https://storage.googleapis.com/a1aa/image/JQW7zykhEAIcFhWTT9onHORJQbID4mCfAAoB6ISRHds3iS9JA.jpg"
            alt="Default avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
        )}

        {/* Ikon Lonceng */}
        <div className="w-10 h-10 flex justify-center items-center">
          <i className="fas fa-bell text-xl"></i>
        </div>

        {/* Ikon Menu */}
        <div className="w-10 h-10 flex justify-center items-center">
          <i className="fas fa-ellipsis-v text-xl"></i>
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
