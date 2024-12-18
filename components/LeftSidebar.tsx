'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

const LeftSidebar = () => {
  const router = useRouter()

  return (
    <div className="bg-gray-900 text-white w-14 flex flex-col items-center py-4 rounded-lg h-auto pt-8">
      <div
        className="mb-8 cursor-pointer"
        onClick={() => router.push('/dashboard')}
      >
        <Image src="/icons/Widget.svg" alt="Widget" width={32} height={32} />
      </div>
      <div
        className="mb-8 cursor-pointer"
        onClick={() => router.push('/calendar')}
      >
        <Image
          src="/icons/CalendarDots.svg"
          alt="Calendar"
          width={32}
          height={32}
        />
      </div>
      <div
        className="mt-auto mb-4 cursor-pointer"
        onClick={() => router.push('/')}
      >
        <Image src="/icons/Logout.svg" alt="Logout" width={32} height={32} />
      </div>
    </div>
  )
}

export default LeftSidebar
