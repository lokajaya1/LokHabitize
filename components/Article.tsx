const Article = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">
          The Nine Habits to Increase Your Energy
        </h2>
      </div>
      <div className="flex items-center space-x-4">
        <img
          src="/images/article.svg"
          alt="Article"
          className="rounded-lg"
          width={80}
          height={80}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <span>Read More</span>
          <i className="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  )
}

export default Article
