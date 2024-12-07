const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Hero Section */}
      <header className="w-full bg-blue-500 text-white py-12 px-4 text-center">
        <h1 className="text-5xl font-bold">Welcome to LokHabitize</h1>
        <p className="mt-4 text-lg">
          Transform your daily habits with ease and efficiency.
        </p>
        <button className="mt-6 px-6 py-3 bg-white text-blue-500 font-semibold rounded-lg shadow-md hover:bg-gray-200">
          Get Started
        </button>
      </header>

      {/* Features Section */}
      <section className="py-16 px-6 w-full max-w-7xl text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Why Choose LokHabitize?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Track Your Habits</h3>
            <p className="text-gray-600">
              Monitor your daily activities and build better habits with our
              intuitive tracking system.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Set Clear Goals</h3>
            <p className="text-gray-600">
              Define achievable goals and stay motivated with personalized
              reminders.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Analyze Your Progress</h3>
            <p className="text-gray-600">
              Get insights into your progress with detailed analytics and
              reports.
            </p>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <footer className="w-full bg-blue-500 text-white py-12 px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">
          Ready to start your journey?
        </h2>
        <p className="text-lg">
          Sign up now and begin transforming your habits today.
        </p>
        <button className="mt-6 px-6 py-3 bg-white text-blue-500 font-semibold rounded-lg shadow-md hover:bg-gray-200">
          Sign Up
        </button>
      </footer>
    </div>
  )
}

export default HomePage
