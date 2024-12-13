const Header = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-4xl font-bold">Hi, John!</h1>
      </div>
      <div className="flex items-center space-x-4">
        <img
          src="https://storage.googleapis.com/a1aa/image/ccN33c9SMvJlK1EeruMeTsb9dDVvguvJr3LFKBTwsff0RQnPB.jpg"
          alt="User avatar"
          className="rounded-full"
          width="40"
          height="40"
        />
        <i className="fas fa-bell text-2xl"></i>
        <i className="fas fa-ellipsis-v text-2xl"></i>
      </div>
    </div>
  )
}

export default Header
