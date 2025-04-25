import { getLatestMovies, getMoviesByCategory } from "@/lib/api/ophim"
import MovieCard from "@/components/MovieCard"
import Pagination from "@/components/Pagination"
import type { Metadata } from "next"
import Link from "next/link"

interface MovieListPageProps {
  params: {
    type: string
  }
  searchParams: Promise<{
    page?: string
  }>
}

export async function generateMetadata({ params }: MovieListPageProps): Promise<Metadata> {
  const typeMap: Record<string, string> = {
    "phim-moi-cap-nhat": "Latest Movies",
    "phim-le": "Movies",
    "phim-bo": "TV Series",
    "hoat-hinh": "Anime",
  }

  const title = typeMap[params.type] || "Movies"

  return {
    title: title,
    description: `Browse ${title.toLowerCase()} and TV shows`,
  }
}

export default async function MovieListPage({ params, searchParams }: MovieListPageProps) {
  // Await the searchParams before using it
  const searchParamsData = await searchParams
  const page = Number.parseInt(searchParamsData.page || "1", 10)

  try {
    let movies
    let apiParams

    // Handle different list types
    if (params.type === "phim-moi-cap-nhat") {
      const data = await getLatestMovies(page)
      movies = data.items
      apiParams = data.params
    } else {
      // For other types, we'll use the category endpoint
      const data = await getMoviesByCategory(params.type, page)
      movies = data.items
      apiParams = data.params
    }

    const { totalPages, currentPage } = apiParams.pagination

    // Format the type name for display
    const typeMap: Record<string, string> = {
      "phim-moi-cap-nhat": "Latest Movies",
      "phim-le": "Movies",
      "phim-bo": "TV Series",
      "hoat-hinh": "Anime",
    }

    const typeName =
      typeMap[params.type] ||
      params.type
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">{typeName}</h1>
          <p className="text-gray-400">
            {apiParams.pagination.totalItems} movies • Page {currentPage} of {totalPages}
          </p>
        </div>

        {movies.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <h2 className="text-xl font-semibold mb-4">No movies found</h2>
            <p className="text-gray-400">We couldn't find any movies in this category.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-8">
              {movies.map((movie) => (
                <MovieCard key={movie._id} movie={movie} />
              ))}
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl={`/danh-sach/${params.type}?page=`} />
          </>
        )}
      </div>
    )
  } catch (error) {
    console.error("Error fetching movies list:", error)

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-lg p-8 text-center">
          <h2 className="text-xl font-semibold mb-4">Unable to load movies</h2>
          <p className="text-gray-400 mb-6">We're having trouble loading the movies list. Please try again later.</p>
          <Link href="/" className="text-red-500 hover:text-red-400 transition-colors">
            Return to Home
          </Link>
        </div>
      </div>
    )
  }
}
