const HabitList = () => {
  const habits = [
    {
      name: 'Study',
      icon: 'fas fa-book',
      color: 'bg-purple-600',
      time: '06:00 pm',
      location: 'Home',
      duration: '60min'
    },
    {
      name: 'Cooking mealprep',
      icon: 'fas fa-utensils',
      color: 'bg-black',
      time: '08:00 pm',
      location: 'Home',
      duration: '45min'
    }
  ]

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">All Habit tracker</h2>
        <div className="flex items-center space-x-2">
          <button className="bg-white border rounded-lg px-4 py-2">
            <i className="fas fa-search"></i>
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
            <i className="fas fa-plus mr-2"></i> Add habit
          </button>
        </div>
      </div>
      <div className="space-y-4">
        {habits.map((habit, index) => (
          <div className="flex items-center justify-between" key={index}>
            <div className="flex items-center space-x-4">
              <div className={`${habit.color} p-3 rounded-lg`}>
                <i className={`${habit.icon} text-white`}></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold">{habit.name}</h3>
                <div className="text-gray-500 text-sm flex items-center space-x-2">
                  <span>{habit.time}</span>
                  <span>•</span>
                  <span>{habit.location}</span>
                  <span>•</span>
                  <span>{habit.duration}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg">
                Done
              </button>
              <i className="fas fa-ellipsis-v text-gray-600"></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HabitList
