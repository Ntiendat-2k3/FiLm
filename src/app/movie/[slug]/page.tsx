import { getMovieDetail, getMoviesByCategory, getFullImageUrl } from "@/lib/api/ophim"
import Image from "next/image"
import Link from "next/link"
import { Play, Calendar, Clock, Star, Film, Globe } from "lucide-react"
import type { Metadata } from "next"
import EpisodeList from "@/components/EpisodeList"
import MovieCard from "@/components/MovieCard"
import type { Movie } from "@/types/ophim"

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { movie } = await getMovieDetail(params.slug)

  return {
    title: `${movie.name} (${movie.year})`,
    description: movie.content,
    openGraph: {
      images: [getFullImageUrl(movie.poster_url || movie.thumb_url)],
    },
  }
}

export default async function MoviePage({ params }: PageProps) {
  const { movie, episodes } = await getMovieDetail(params.slug)

  const firstEpisode = episodes[0]?.server_data[0]

  // Get full image URLs
  const posterUrl = getFullImageUrl(movie.poster_url || movie.thumb_url)
  const thumbUrl = getFullImageUrl(movie.thumb_url)

  // Fetch related movies based on the first category
  let relatedMovies: Movie[] = []
  if (movie.category && movie.category.length > 0) {
    const categorySlug = movie.category[0].slug
    const { items } = await getMoviesByCategory(categorySlug, 1)
    // Filter out the current movie and limit to 6 movies
    relatedMovies = items.filter((relatedMovie) => relatedMovie.slug !== movie.slug).slice(0, 6)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        {/* Movie banner/poster */}
        <div className="relative h-[300px] md:h-[400px]">
          <Image src={posterUrl || "/placeholder.svg"} alt={movie.name} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>

          <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col md:flex-row gap-6">
            <div className="relative w-32 h-48 flex-shrink-0 rounded-lg overflow-hidden shadow-lg hidden md:block">
              <Image src={thumbUrl || "/placeholder.svg"} alt={movie.name} fill className="object-cover" />
            </div>

            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{movie.name}</h1>
              <p className="text-gray-300 mb-4">
                {movie.origin_name} ({movie.year})
              </p>

              <div className="flex flex-wrap gap-4 mb-4">
                {movie.quality && (
                  <span className="bg-red-600 text-white px-2 py-1 rounded text-sm">{movie.quality}</span>
                )}

                {movie.lang && <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm">{movie.lang}</span>}

                {movie.status && (
                  <span className="bg-green-600 text-white px-2 py-1 rounded text-sm">{movie.status}</span>
                )}
              </div>

              {firstEpisode && (
                <Link
                  href={`/watch/${movie.slug}/${firstEpisode.slug}`}
                  className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Play className="mr-2" size={16} />
                  {movie.type === "single" ? "Watch Now" : "Watch Episode 1"}
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Movie info */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-xl font-bold mb-4 text-white">Overview</h2>
              <div className="text-gray-300 mb-6 leading-relaxed" dangerouslySetInnerHTML={{ __html: movie.content }} />

              {episodes.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-xl font-bold mb-4 text-white">Episodes</h2>
                  <EpisodeList episodes={episodes} movieSlug={movie.slug} />
                </div>
              )}
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4 text-white">Details</h2>
              <ul className="space-y-3 text-gray-300">
                {movie.time && (
                  <li className="flex items-start">
                    <Clock className="mr-2 text-gray-400 flex-shrink-0 mt-1" size={16} />
                    <div>
                      <span className="text-gray-400">Duration: </span>
                      {movie.time}
                    </div>
                  </li>
                )}

                {movie.year && (
                  <li className="flex items-start">
                    <Calendar className="mr-2 text-gray-400 flex-shrink-0 mt-1" size={16} />
                    <div>
                      <span className="text-gray-400">Release Year: </span>
                      {movie.year}
                    </div>
                  </li>
                )}

                {movie.type && (
                  <li className="flex items-start">
                    <Film className="mr-2 text-gray-400 flex-shrink-0 mt-1" size={16} />
                    <div>
                      <span className="text-gray-400">Type: </span>
                      {movie.type === "series" ? "TV Series" : "Movie"}
                    </div>
                  </li>
                )}

                {movie.country && movie.country.length > 0 && (
                  <li className="flex items-start">
                    <Globe className="mr-2 text-gray-400 flex-shrink-0 mt-1" size={16} />
                    <div>
                      <span className="text-gray-400">Country: </span>
                      {movie.country.map((c) => c.name).join(", ")}
                    </div>
                  </li>
                )}

                {movie.category && movie.category.length > 0 && (
                  <li className="flex items-start">
                    <Star className="mr-2 text-gray-400 flex-shrink-0 mt-1" size={16} />
                    <div>
                      <span className="text-gray-400">Genres: </span>
                      <div className="flex flex-wrap gap-1">
                        {movie.category.map((cat) => (
                          <Link key={cat.id} href={`/category/${cat.slug}`} className="text-blue-400 hover:underline">
                            {cat.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </li>
                )}

                {movie.actor && movie.actor.length > 0 && (
                  <li className="flex items-start">
                    <div className="mr-2 text-gray-400 flex-shrink-0 mt-1">👥</div>
                    <div>
                      <span className="text-gray-400">Cast: </span>
                      {movie.actor.join(", ")}
                    </div>
                  </li>
                )}

                {movie.director && movie.director.length > 0 && (
                  <li className="flex items-start">
                    <div className="mr-2 text-gray-400 flex-shrink-0 mt-1">🎬</div>
                    <div>
                      <span className="text-gray-400">Director: </span>
                      {movie.director.join(", ")}
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {relatedMovies.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {relatedMovies.map((relatedMovie) => (
              <MovieCard key={relatedMovie._id} movie={relatedMovie} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
