const Header = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center space-x-4">
        <img
          src="https://storage.googleapis.com/a1aa/image/JQW7zykhEAIcFhWTT9onHORJQbID4mCfAAoB6ISRHds3iS9JA.jpg"
          alt="User avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="w-10 h-10 flex justify-center items-center">
          <i className="fas fa-bell text-xl"></i>
        </div>
        <div className="w-10 h-10 flex justify-center items-center">
          <i className="fas fa-ellipsis-v text-xl"></i>
        </div>
      </div>
      <div className="text-2xl font-bold text-gray-800">LokHabitize</div>
    </div>
  )
}

export default Header
