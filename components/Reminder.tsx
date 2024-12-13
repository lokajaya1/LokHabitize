const Reminder = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Reminder</h3>
      <div className="flex items-center space-x-4">
        <div className="bg-purple-600 p-3 rounded-lg">
          <i className="fas fa-bell text-white"></i>
        </div>
        <p className="text-gray-500">
          Don't forget to take your pills. Stay healthy!
        </p>
      </div>
    </div>
  )
}

export default Reminder
