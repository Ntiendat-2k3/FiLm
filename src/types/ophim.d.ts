export interface Movie {
  _id: string
  name: string
  origin_name: string
  slug: string
  year: number
  thumb_url: string
  poster_url: string
  time?: string
  episode_current?: string
  quality?: string
  lang?: string
  category?: Category[]
  country?: Country[]
  type: string
  status?: string
  modified: {
    time: string
  }
  content?: string
  actor?: string[]
  director?: string[]
}

export interface Category {
  id: string
  name: string
  slug: string
}

export interface Country {
  id: string
  name: string
  slug: string
}

export interface MovieListResponse {
  status: boolean
  items: Movie[]
  pathImage: string
  pagination: {
    totalItems: number
    totalItemsPerPage: number
    currentPage: number
    totalPages: number
  }
}

export interface MovieDetail {
  _id: string
  name: string
  origin_name: string
  content: string
  type: string
  status: string
  thumb_url: string
  poster_url: string
  time: string
  episode_current: string
  episode_total?: string
  quality: string
  lang: string
  slug: string
  year: number
  actor: string[]
  director: string[]
  category: Category[]
  country: Country[]
  trailer_url?: string
  // Add other fields as needed
}

export interface Episode {
  name: string
  slug: string
  filename: string
  link_embed: string
  link_m3u8: string
}

export interface EpisodeGroup {
  server_name: string
  server_data: Episode[]
}

export interface MovieDetailResponse {
  status: boolean
  msg: string
  movie: MovieDetail
  episodes: EpisodeGroup[]
}
