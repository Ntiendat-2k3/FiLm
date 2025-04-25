import { getLatestMovies } from "@/lib/api/ophim"
import MovieCard from "@/components/MovieCard"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import Pagination from "@/components/Pagination"

interface HomePageProps {
  searchParams: Promise<{
    page?: string
  }>
}

export default async function Home({ searchParams }: HomePageProps) {
  // Await the searchParams before using it (Next.js 15 requirement)
  const params = await searchParams
  const page = Number.parseInt(params.page || "1", 10)

  try {
    const response = await getLatestMovies(page)
    const { items: latestMovies, params: apiParams } = response

    // Split movies for different sections
    const movies = latestMovies.slice(0, 12)
    const series = latestMovies.filter((movie) => movie.type === "series").slice(0, 12)

    // Default pagination values in case API doesn't return expected structure
    const currentPage = apiParams?.pagination?.currentPage || 1
    const totalPages = apiParams?.pagination?.totalPages || 1

    return (
      <div className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Latest Movies</h2>
            <Link
              href="/danh-sach/phim-moi-cap-nhat"
              className="flex items-center text-red-500 hover:text-red-400 transition-colors"
            >
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {movies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">TV Series</h2>
            <Link
              href="/danh-sach/phim-bo"
              className="flex items-center text-red-500 hover:text-red-400 transition-colors"
            >
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {series.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        </section>

        {page === 1 && (
          <section className="bg-gray-800 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4 text-white">Welcome to MovieFlix</h2>
            <p className="text-gray-300 mb-6">
              Discover the latest movies and TV shows. Watch online or download to watch later. Our collection is
              updated daily with new releases and popular titles.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Movies</h3>
                <p className="text-gray-400 mb-4">
                  Explore our vast collection of movies from different genres, countries, and years.
                </p>
                <Link
                  href="/danh-sach/phim-le"
                  className="inline-block bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors"
                >
                  Browse Movies
                </Link>
              </div>
              <div className="bg-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">TV Series</h3>
                <p className="text-gray-400 mb-4">
                  Follow your favorite TV series and watch episodes as soon as they are released.
                </p>
                <Link
                  href="/danh-sach/phim-bo"
                  className="inline-block bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors"
                >
                  Browse TV Series
                </Link>
              </div>
            </div>
          </section>
        )}

        <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl="/?page=" />
      </div>
    )
  } catch (error) {
    console.error("Error fetching movies:", error)

    // Return a fallback UI in case of error
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-lg p-8 text-center">
          <h2 className="text-xl font-semibold mb-4">Unable to load movies</h2>
          <p className="text-gray-400 mb-6">We're having trouble loading the latest movies. Please try again later.</p>
          <Link href="/" className="text-red-500 hover:text-red-400 transition-colors">
            Retry
          </Link>
        </div>
      </div>
    )
  }
}
