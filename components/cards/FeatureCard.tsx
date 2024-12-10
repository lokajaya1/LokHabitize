import React from 'react'

interface FeatureCardProps {
  title: string
  description: string
  image: string
  bgColor: string
  reverse?: boolean
}

const FeatureCard = ({
  title,
  description,
  image,
  bgColor,
  reverse
}: FeatureCardProps) => {
  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-2 items-stretch gap-8`}
      style={{ backgroundColor: bgColor }}
    >
      {/* Image Section */}
      <div
        className={`p-4 ${reverse ? 'lg:order-2' : ''}`}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <img src={image} alt={title} className="w-full h-auto rounded-lg" />
      </div>

      {/* Content Section */}
      <div
        className={`p-4 flex flex-col justify-between ${reverse ? 'lg:order-1' : ''}`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <div
          className={`flex ${reverse ? 'justify-end' : 'justify-start'}`}
          style={{ width: '100%' }}
        >
          {/* BETA Tag */}
          <div
            className="inline-block rounded-lg border border-black px-4 py-2 text-center text-black font-medium cursor-default"
            style={{ height: 'fit-content' }}
          >
            BETA
          </div>
        </div>

        <div className="flex flex-col justify-center flex-grow">
          <h2 className="text-3xl font-bold mt-4">{title}</h2>
          <p className="text-lg mt-2">{description}</p>
        </div>
      </div>
    </div>
  )
}

export default FeatureCard
