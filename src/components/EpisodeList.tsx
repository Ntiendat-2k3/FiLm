import Link from "next/link"
import type { EpisodeGroup } from "@/types/ophim"

interface EpisodeListProps {
  episodes: EpisodeGroup[]
  movieSlug: string
  currentEpisode?: string
}

export default function EpisodeList({ episodes, movieSlug, currentEpisode }: EpisodeListProps) {
  if (!episodes || episodes.length === 0) {
    return <div className="text-gray-400 py-4">No episodes available</div>
  }

  return (
    <div className="space-y-6">
      {episodes.map((group, index) => (
        <div key={index} className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3 text-white">{group.server_name}</h3>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
            {group.server_data.map((episode) => {
              const isActive = currentEpisode === episode.slug
              return (
                <Link
                  key={episode.slug}
                  href={`/watch/${movieSlug}/${episode.slug}`}
                  className={`
                    text-center py-2 px-1 rounded transition-colors
                    ${isActive ? "bg-red-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}
                  `}
                >
                  {episode.name}
                </Link>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
