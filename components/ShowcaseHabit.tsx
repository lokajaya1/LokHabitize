import React from 'react'
import Image from 'next/image'

const ShowcaseHabit = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      {/* Frame Tablet */}
      <div className="relative rounded-3xl shadow-lg w-[900px] h-[600px] flex justify-center items-center bg-background">
        {/* Tampilan Browser */}
        <div className="bg-black w-[85%] h-[85%] rounded-xl overflow-hidden shadow-inner">
          {/* Header Browser */}
          <div className="flex items-center justify-start bg-gray-800 h-10 px-4">
            {/* Tombol Navigasi */}
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            {/* URL Placeholder */}
            <div className="ml-4 bg-gray-700 text-gray-400 text-sm px-4 py-1 rounded-full w-64 truncate">
              scientify.ai/search
            </div>
          </div>
          {/* Konten Browser */}
          <div className="bg-gray-900 w-full h-full"></div>
        </div>
      </div>
    </div>
  )
}

export default ShowcaseHabit
