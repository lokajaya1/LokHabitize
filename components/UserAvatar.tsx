import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import ROUTES from '@/constants/routes' // Konstanta rute halaman dalam proyek LokHabitize

import { Avatar, AvatarFallback } from './ui/avatar' // Komponen Avatar yang sudah ada

interface UserAvatarProps {
  id: string // ID unik pengguna
  username: string // Username pengguna
  imageUrl?: string | null // URL gambar profil (opsional)
  className?: string // Kelas tambahan untuk avatar
}

const UserAvatar = ({
  id,
  username,
  imageUrl,
  className = 'h-10 w-10' // Default ukuran avatar
}: UserAvatarProps) => {
  // Mengambil inisial username (maksimal 2 huruf)
  const initials = username
    .slice(0, 2) // Ambil dua huruf pertama username
    .toUpperCase()

  return (
    <Link
      href={ROUTES.PROFILE(id)} // Rute menuju halaman profil pengguna
      className="block rounded-full hover:opacity-80 transition-opacity duration-200"
      aria-label={`${username}'s profile`}
    >
      <Avatar className={className}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={`${username}'s profile picture`}
            className="object-cover rounded-full"
            width={40}
            height={40}
            quality={100} // Gambar dengan kualitas tinggi
            loading="lazy" // Optimisasi lazy load
          />
        ) : (
          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-white">
            {initials}
          </AvatarFallback>
        )}
      </Avatar>
    </Link>
  )
}

export default UserAvatar
