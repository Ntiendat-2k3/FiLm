export default function Loading() {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="h-8 bg-gray-700 rounded w-1/3 mb-2 animate-pulse"></div>
          <div className="h-5 bg-gray-700 rounded w-1/4 animate-pulse"></div>
        </div>
  
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="bg-gray-800 rounded-lg overflow-hidden animate-pulse">
              <div className="aspect-[2/3] bg-gray-700"></div>
              <div className="p-3">
                <div className="h-5 bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  