export default function Loading() {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-lg overflow-hidden animate-pulse">
          <div className="h-[300px] md:h-[400px] bg-gray-700"></div>
          <div className="p-6">
            <div className="h-8 bg-gray-700 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/3 mb-6"></div>
  
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <div className="h-6 bg-gray-700 rounded w-1/4 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-700 rounded w-full"></div>
                  <div className="h-4 bg-gray-700 rounded w-full"></div>
                  <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                </div>
              </div>
  
              <div>
                <div className="h-6 bg-gray-700 rounded w-1/4 mb-4"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-700 rounded w-full"></div>
                  <div className="h-4 bg-gray-700 rounded w-full"></div>
                  <div className="h-4 bg-gray-700 rounded w-full"></div>
                  <div className="h-4 bg-gray-700 rounded w-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  