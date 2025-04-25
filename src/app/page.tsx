import { getLatestMovies } from "@/lib/api/ophim"
import MovieCard from "@/components/MovieCard"
import Link from "next/link"
import { ChevronRight, Play, FileText, Search } from "lucide-react"
import Pagination from "@/components/Pagination"
import Image from "next/image"
import { getFullImageUrl } from "@/lib/api/ophim"

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
    const { items: latestMovies, pagination } = response

    // Get featured movie (first movie)
    const featuredMovie = latestMovies[0]

    // Split movies for different sections
    const movies = latestMovies.slice(1, 7)
    const series = latestMovies.filter((movie) => movie.type === "series").slice(0, 6)
    const anime = latestMovies.filter((movie) => movie.category?.some((cat) => cat.slug === "hoat-hinh")).slice(0, 6)

    // Default pagination values
    const currentPage = pagination?.currentPage || 1
    const totalPages = pagination?.totalPages || 1

    return (
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        {/* Hero Section */}
        {featuredMovie && (
          <div className="relative rounded-2xl overflow-hidden mb-12 bg-black">
            <div className="relative h-[500px] w-full">
              <Image
                src={getFullImageUrl(featuredMovie.poster_url || featuredMovie.thumb_url)}
                alt={featuredMovie.name}
                fill
                className="object-cover opacity-80"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
            </div>

            <div className="absolute top-0 left-0 p-4 flex gap-2">
              <Link href="/our-slate" className="text-white/80 hover:text-white transition-colors text-sm">
                OUR SLATE
              </Link>
              <Link href="/in-post" className="text-red-500 hover:text-red-400 transition-colors text-sm">
                IN POST
              </Link>
              <Link href="/in-production" className="text-white/80 hover:text-white transition-colors text-sm">
                IN PRODUCTION
              </Link>
              <Link href="/in-development" className="text-white/80 hover:text-white transition-colors text-sm">
                IN DEVELOPMENT
              </Link>
            </div>

            <div className="absolute bottom-0 left-0 p-8 w-full md:w-1/2">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-green-500 text-sm font-semibold">NEW</span>
                <span className="text-white/80 text-sm">{featuredMovie.year}</span>
                <span className="bg-gray-700 text-white/80 text-xs px-2 py-1 rounded">
                  {featuredMovie.category?.[0]?.name || "ACTION"}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{featuredMovie.name}</h1>

              <p className="text-white/80 mb-4 line-clamp-2">
                {featuredMovie.content?.replace(/<[^>]*>/g, "") ||
                  "A thrilling story of adventure and excitement. Watch as our heroes face challenges and overcome obstacles in this epic tale."}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {featuredMovie.category?.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.slug}`}
                    className="text-white/60 text-sm hover:text-white transition-colors"
                  >
                    {cat.name.toLowerCase()}
                  </Link>
                ))}
              </div>

              <div className="flex gap-3">
                <Link
                  href={`/watch/${featuredMovie.slug}/1`}
                  className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  <Play size={16} className="mr-2" />
                  PLAY NOW
                </Link>
                <Link
                  href={`/movie/${featuredMovie.slug}`}
                  className="flex items-center bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors"
                >
                  <FileText size={16} className="mr-2" />
                  VIEW DETAILS
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="relative mb-12">
          <form action="/search" className="relative">
            <input
              type="text"
              name="q"
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

          <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 rounded-xl shadow-lg z-10 hidden">
            <div className="p-2">
              <div className="text-sm text-gray-400 mb-2">Popular Searches</div>
              <div className="grid grid-cols-2 gap-2">
                <Link href="/search?q=action" className="text-white hover:text-red-500 transition-colors">
                  Action Movies
                </Link>
                <Link href="/search?q=2023" className="text-white hover:text-red-500 transition-colors">
                  2023 Releases
                </Link>
                <Link href="/search?q=korean" className="text-white hover:text-red-500 transition-colors">
                  Korean Dramas
                </Link>
                <Link href="/search?q=anime" className="text-white hover:text-red-500 transition-colors">
                  Anime
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Movies Section */}
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {movies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        </section>

        {/* TV Series Section */}
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {series.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        </section>

        {/* Anime Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Anime</h2>
            <Link
              href="/danh-sach/hoat-hinh"
              className="flex items-center text-red-500 hover:text-red-400 transition-colors"
            >
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {anime.length > 0
              ? anime.map((movie) => <MovieCard key={movie._id} movie={movie} />)
              : // Fallback if no anime is found
                latestMovies
                  .slice(7, 13)
                  .map((movie) => <MovieCard key={movie._id} movie={movie} />)}
          </div>
        </section>

        {/* Comparables Section */}
        <section className="mb-12">
          <div className="mb-6">
            <div className="flex gap-6 border-b border-gray-700">
              <button className="text-red-500 border-b-2 border-red-500 pb-2 font-medium">COMPARABLES</button>
              <button className="text-white/80 hover:text-white pb-2 font-medium">SYNOPSIS</button>
              <button className="text-white/80 hover:text-white pb-2 font-medium">CAST & CREW</button>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {latestMovies.slice(13, 18).map((movie) => (
              <Link key={movie._id} href={`/movie/${movie.slug}`} className="block">
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={getFullImageUrl(movie.thumb_url) || "/placeholder.svg"}
                    alt={movie.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl="/?page=" />
      </div>
    )
  } catch (error) {
    console.error("Error fetching movies:", error)

    // Return a fallback UI in case of error
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-8">
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
