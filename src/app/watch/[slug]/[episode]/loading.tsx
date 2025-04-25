export default function Loading() {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 h-6 w-40 bg-gray-700 rounded animate-pulse"></div>
  
        <div className="h-8 bg-gray-700 rounded w-1/2 mb-4 animate-pulse"></div>
  
        <div className="aspect-video bg-gray-700 rounded mb-8 animate-pulse"></div>
  
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="h-6 bg-gray-700 rounded w-1/4 mb-4 animate-pulse"></div>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="h-10 bg-gray-700 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
  
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="h-6 bg-gray-700 rounded w-1/4 mb-4 animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-700 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-700 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-700 rounded w-3/4 animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }
  