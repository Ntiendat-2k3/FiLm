export function formatEpisodeNumber(episodeText: string): string {
  // Convert "Tập 1" to "1", "Full" to "Full", etc.
  const match = episodeText.match(/\d+/)
  return match ? match[0] : episodeText
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}
