const Article = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">
        The nine habits to increase your energy
      </h3>
      <div className="flex items-center space-x-4">
        <img
          src="https://storage.googleapis.com/a1aa/image/eHVSdHbi6YXiZyrlvCrCnQtyLpVvCxYGxysAvJ7kQHkPC68JA.jpg"
          alt="Illustration of a person exercising"
          className="rounded-lg"
          width="80"
          height="80"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
          Read More
          <i className="fas fa-arrow-right ml-2"></i>
        </button>
      </div>
    </div>
  )
}

export default Article
