import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import ROUTES from '@/constants/routes'

import { Avatar, AvatarFallback } from './ui/avatar'

interface UserAvatarProps {
  id: string
  username: string
  imageUrl?: string | null
  className?: string
}

const UserAvatar = ({
  id,
  username,
  imageUrl,
  className = 'h-10 w-10'
}: UserAvatarProps) => {
  const initials = username.slice(0, 2).toUpperCase()

  return (
    <Link
      href={ROUTES.PROFILE(id)}
      prefetch={false} // Non-preload jika jarang dikunjungi
      className="block rounded-full hover:opacity-80 transition-opacity duration-200"
      aria-label={`Visit ${username}'s profile`}
    >
      <Avatar className={className}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={`Profile picture of ${username}`}
            className="object-cover rounded-full"
            width={40}
            height={40}
            layout="intrinsic" // Untuk ukuran yang dinamis
            quality={100}
            loading="lazy"
          />
        ) : (
          <AvatarFallback
            className="bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-white"
            title={username} // Tooltip aksesibilitas
          >
            {initials}
          </AvatarFallback>
        )}
      </Avatar>
    </Link>
  )
}

export default UserAvatar
