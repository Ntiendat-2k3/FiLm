import { getMovieDetail } from "@/lib/api/ophim"
import Player from "@/components/Player"
import EpisodeList from "@/components/EpisodeList"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

interface PageProps {
  params: {
    slug: string
    episode: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { movie } = await getMovieDetail(params.slug)

  // Find the current episode
  let currentEpisodeName = ""
  const { episodes } = await getMovieDetail(params.slug)
  for (const server of episodes) {
    const episode = server.server_data.find((ep) => ep.slug === params.episode)
    if (episode) {
      currentEpisodeName = episode.name
      break
    }
  }

  return {
    title: `Watch ${movie.name} ${currentEpisodeName}`,
    description: movie.content,
  }
}

export default async function WatchPage({ params }: PageProps) {
  const { movie, episodes } = await getMovieDetail(params.slug)

  // Find the current episode
  let currentEpisode = null
  for (const server of episodes) {
    const episode = server.server_data.find((ep) => ep.slug === params.episode)
    if (episode) {
      currentEpisode = episode
      break
    }
  }

  if (!currentEpisode) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href={`/movie/${params.slug}`}
          className="inline-flex items-center text-gray-300 hover:text-white transition-colors"
        >
          <ChevronLeft size={20} />
          Back to movie details
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-4">
        {movie.name} - {currentEpisode.name}
      </h1>

      <div className="mb-8">
        <Player
          src={currentEpisode.link_embed || currentEpisode.link_m3u8}
          title={`${movie.name} - ${currentEpisode.name}`}
        />
      </div>

      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Episodes</h2>
        <EpisodeList episodes={episodes} movieSlug={movie.slug} currentEpisode={params.episode} />
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">About {movie.name}</h2>
        <div className="text-gray-300 mb-6 leading-relaxed" dangerouslySetInnerHTML={{ __html: movie.content }} />
      </div>
    </div>
  )
}
