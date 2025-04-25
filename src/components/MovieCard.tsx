import Link from "next/link"
import Image from "next/image"
import type { Movie } from "@/types/ophim"
import { getFullImageUrl } from "@/lib/api/ophim"
import { Play } from "lucide-react"

interface MovieCardProps {
  movie: Movie
}

export default function MovieCard({ movie }: MovieCardProps) {
  // Get the full image URL
  const imageUrl = getFullImageUrl(movie.thumb_url)

  return (
    <Link href={`/movie/${movie.slug}`} className="group block">
      <div className="relative overflow-hidden rounded-lg bg-gray-800 transition-all duration-300 hover:scale-105">
        <div className="aspect-[2/3] relative">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={movie.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-100"></div>

          {/* Play button overlay (hidden by default, shown on hover) */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-red-600/80 text-white rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300">
              <Play size={20} />
            </div>
          </div>

          {/* Quality badge */}
          {movie.quality && (
            <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
              {movie.quality}
            </span>
          )}

          {/* Episode badge */}
          {movie.episode_current && (
            <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
              {movie.episode_current}
            </span>
          )}

          {/* Movie info at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <h3 className="font-semibold text-white group-hover:text-red-500 transition-colors line-clamp-1 text-sm">
              {movie.name}
            </h3>
            <div className="flex justify-between items-center">
              <p className="text-gray-400 text-xs mt-1">{movie.year}</p>
              {movie.category && movie.category[0] && (
                <span className="text-gray-400 text-xs">{movie.category[0].name}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
