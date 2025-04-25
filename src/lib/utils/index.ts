export function formatEpisodeNumber(episodeText: string): string {
  // Convert "Tập 1" to "1", "Full" to "Full", etc.
  const match = episodeText.match(/\d+/)
  return match ? match[0] : episodeText
}

export function getImageFallback(url: string | undefined): string {
  if (!url) return "/placeholder.svg?height=300&width=200"

  // Check if the URL is already absolute
  if (url.startsWith("http")) {
    return url
  }

  // If it's a relative URL without a leading slash, add one
  if (!url.startsWith("/")) {
    return `/placeholder.svg?height=300&width=200`
  }

  return url
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}
