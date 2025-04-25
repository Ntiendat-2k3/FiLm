import Link from "next/link"
import Image from "next/image"
import type { Movie } from "@/types/ophim"

interface MovieCardProps {
  movie: Movie
}

export default function MovieCard({ movie }: MovieCardProps) {
  // Ensure image URLs are absolute
  const imageUrl =
    movie.thumb_url && movie.thumb_url.startsWith("http") ? movie.thumb_url : "/placeholder.svg?height=300&width=200"

  return (
    <Link href={`/movie/${movie.slug}`} className="group">
      <div className="relative overflow-hidden rounded-lg bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-xl">
        <div className="aspect-[2/3] relative">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={movie.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

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
        </div>

        <div className="p-3">
          <h3 className="font-semibold text-white group-hover:text-red-500 transition-colors line-clamp-1">
            {movie.name}
          </h3>
          <p className="text-gray-400 text-sm mt-1 line-clamp-1">
            {movie.origin_name} ({movie.year})
          </p>
        </div>
      </div>
    </Link>
  )
}
