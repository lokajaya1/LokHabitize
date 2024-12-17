import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import ROUTES from '@/constants/routes'

import { Avatar, AvatarFallback } from './ui/avatar'

interface Props {
  id: string
  username: string
  imageUrl?: string | null
  className?: string
}

const UserAvatar = ({
  id,
  username,
  imageUrl,
  className = 'h-9 w-9'
}: Props) => {
  const initials =
    username
      ?.split(' ')
      .map((word: string) => word[0])
      .join('')
      .toUpperCase() || ''

  return (
    <Link href={ROUTES.PROFILE(id)}>
      <Avatar className={className}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={username}
            className="object-cover"
            width={36}
            height={36}
            quality={100}
          />
        ) : (
          <AvatarFallback className="primary-gradient font-space-grotesk font-bold tracking-wider text-white">
            {initials}
          </AvatarFallback>
        )}
      </Avatar>
    </Link>
  )
}

export default UserAvatar
