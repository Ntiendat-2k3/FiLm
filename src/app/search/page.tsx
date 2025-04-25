import { searchMovies } from "@/lib/api/ophim"
import MovieCard from "@/components/MovieCard"
import Link from "next/link"
import type { Metadata } from "next"
import Pagination from "@/components/Pagination"
import { Search, TrendingUp } from "lucide-react"

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

  // Popular search terms
  const popularSearches = [
    { term: "action", label: "Action Movies" },
    { term: "comedy", label: "Comedy" },
    { term: "horror", label: "Horror" },
    { term: "romance", label: "Romance" },
    { term: "sci-fi", label: "Sci-Fi" },
    { term: "animation", label: "Animation" },
    { term: "thriller", label: "Thriller" },
    { term: "drama", label: "Drama" },
  ]

  // If no query, show empty state with suggestions
  if (!query) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-white">Search Movies</h1>

        <div className="relative mb-8">
          <form action="/search" className="relative">
            <input
              type="text"
              name="q"
              placeholder="Search for movies, TV shows, actors..."
              className="w-full bg-gray-800 text-white px-4 py-3 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
              autoFocus
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <Search size={20} />
            </button>
          </form>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <TrendingUp className="mr-2" size={20} />
            Popular Searches
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {popularSearches.map((item) => (
              <Link
                key={item.term}
                href={`/search?q=${encodeURIComponent(item.term)}`}
                className="bg-gray-800 hover:bg-gray-700 transition-colors rounded-lg p-4 text-center"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Recent Releases</h2>
          <p className="text-gray-400">Try searching for the latest movies and TV shows to watch online.</p>
        </div>
      </div>
    )
  }

  try {
    const { items: movies, pagination } = await searchMovies(query, page)
    const { totalPages, currentPage } = pagination

    return (
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>
          <div className="relative mb-6">
            <form action="/search" className="relative">
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Search for movies, TV shows, actors..."
                className="w-full bg-gray-800 text-white px-4 py-3 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <Search size={20} />
              </button>
            </form>
          </div>
          <p className="text-gray-400">
            Found {pagination.totalItems} results • Page {currentPage} of {totalPages}
          </p>
        </div>

        {movies.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <h2 className="text-xl font-semibold mb-4">No results found</h2>
            <p className="text-gray-400 mb-6">
              We couldn't find any movies matching "{query}". Please try another search term.
            </p>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Popular Searches</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {popularSearches.map((item) => (
                  <Link
                    key={item.term}
                    href={`/search?q=${encodeURIComponent(item.term)}`}
                    className="bg-gray-700 hover:bg-gray-600 transition-colors rounded-lg px-3 py-2 text-sm"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

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
      <div className="max-w-[1200px] mx-auto px-4 py-8">
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
