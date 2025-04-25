export interface Movie {
    _id: string
    name: string
    origin_name: string
    slug: string
    year: number
    thumb_url: string
    poster_url: string
    time: string
    episode_current: string
    quality: string
    lang: string
    category: Category[]
    country: Country[]
    type: string
    status: string
    modified: {
      time: string
    }
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
    params: {
      pagination: {
        totalItems: number
        totalItemsPerPage: number
        currentPage: number
        totalPages: number
      }
    }
  }
  
  export interface MovieDetail extends Movie {
    content: string
    trailer_url: string
    actor: string[]
    director: string[]
    episodes: EpisodeGroup[]
  }
  
  export interface EpisodeGroup {
    server_name: string
    server_data: Episode[]
  }
  
  export interface Episode {
    name: string
    slug: string
    filename: string
    link_embed: string
    link_m3u8: string
  }
  
  export interface MovieDetailResponse {
    status: boolean
    item: MovieDetail
  }
  