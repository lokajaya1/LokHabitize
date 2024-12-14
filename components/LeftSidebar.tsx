const LeftSidebar = () => {
  return (
    <div className="bg-gray-900 text-white w-14 flex flex-col items-center py-4 rounded-lg h-auto pt-8">
      <div className="mb-8">
        <i className="fas fa-th-large text-2xl"></i>
      </div>
      <div className="mb-8">
        <i className="fas fa-calendar-alt text-2xl"></i>
      </div>
      <div className="mt-auto mb-4">
        <i className="fas fa-sign-out-alt text-2xl"></i>
      </div>
    </div>
  )
}

export default LeftSidebar
