import { searchMovies } from "@/lib/api/ophim"
import MovieCard from "@/components/MovieCard"
import Link from "next/link"
import type { Metadata } from "next"
import Pagination from "@/components/Pagination"

interface SearchPageProps {
  searchParams: Promise<{
    q?: string
    page?: string
  }>
}

export const metadata: Metadata = {
  title: "Search Results",
  description: "Search for movies and TV shows",
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  // Await the searchParams before using it
  const params = await searchParams
  const query = params.q || ""
  const page = Number.parseInt(params.page || "1", 10)

  // If no query, show empty state
  if (!query) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-6">Search Movies</h1>
        <p className="text-gray-400 mb-8">Enter a search term to find movies and TV shows</p>
      </div>
    )
  }

  try {
    const { items: movies, params: apiParams } = await searchMovies(query, page)
    const { totalPages, currentPage } = apiParams.pagination

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Search Results for "{query}"</h1>
          <p className="text-gray-400">
            Found {apiParams.pagination.totalItems} results • Page {currentPage} of {totalPages}
          </p>
        </div>

        {movies.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <h2 className="text-xl font-semibold mb-4">No results found</h2>
            <p className="text-gray-400 mb-6">
              We couldn't find any movies matching "{query}". Please try another search term.
            </p>
            <Link href="/" className="text-red-500 hover:text-red-400 transition-colors">
              Return to Home
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-8">
              {movies.map((movie) => (
                <MovieCard key={movie._id} movie={movie} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              baseUrl={`/search?q=${encodeURIComponent(query)}&page=`}
            />
          </>
        )}
      </div>
    )
  } catch (error) {
    console.error("Error searching movies:", error)

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-lg p-8 text-center">
          <h2 className="text-xl font-semibold mb-4">Search error</h2>
          <p className="text-gray-400 mb-6">We're having trouble searching for "{query}". Please try again later.</p>
          <Link href="/" className="text-red-500 hover:text-red-400 transition-colors">
            Return to Home
          </Link>
        </div>
      </div>
    )
  }
}
