import type { MovieDetailResponse, MovieListResponse } from "@/types/ophim"

const API_URL = process.env.NEXT_PUBLIC_API || "https://ophim1.com"
const IMAGE_PATH = "https://img.ophim.live/uploads/movies/"

export async function getLatestMovies(page = 1): Promise<MovieListResponse> {
  const response = await fetch(`${API_URL}/danh-sach/phim-moi-cap-nhat?page=${page}`, {
    next: { revalidate: 3600 }, // Revalidate every hour
  })

  if (!response.ok) {
    throw new Error("Failed to fetch latest movies")
  }

  return response.json()
}

export async function getMovieDetail(slug: string): Promise<MovieDetailResponse> {
  const response = await fetch(`${API_URL}/phim/${slug}`, {
    next: { revalidate: 3600 }, // Revalidate every hour
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch movie: ${slug}`)
  }

  return response.json()
}

export async function searchMovies(keyword: string, page = 1): Promise<MovieListResponse> {
  // The API uses the same endpoint for search, just with a different query parameter
  const response = await fetch(`${API_URL}/tim-kiem?keyword=${encodeURIComponent(keyword)}&page=${page}`, {
    next: { revalidate: 60 }, // Revalidate more frequently for search results
  })

  if (!response.ok) {
    throw new Error("Failed to search movies")
  }

  return response.json()
}

export async function getMoviesByCategory(category: string, page = 1): Promise<MovieListResponse> {
  const response = await fetch(`${API_URL}/the-loai/${category}?page=${page}`, {
    next: { revalidate: 3600 },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch movies by category: ${category}`)
  }

  return response.json()
}

export async function getMoviesByCountry(country: string, page = 1): Promise<MovieListResponse> {
  const response = await fetch(`${API_URL}/quoc-gia/${country}?page=${page}`, {
    next: { revalidate: 3600 },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch movies by country: ${country}`)
  }

  return response.json()
}

// Helper function to get full image URL
export function getFullImageUrl(path: string | undefined): string {
  if (!path) return "/placeholder.svg?height=300&width=200"

  // If it's already an absolute URL
  if (path.startsWith("http")) {
    return path
  }

  // If it's a relative path without the image domain
  return `${IMAGE_PATH}${path}`
}
