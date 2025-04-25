import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  baseUrl: string
}

export default function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
  // Don't show pagination if there's only one page
  if (totalPages <= 1) {
    return null
  }

  // Calculate which page numbers to show
  const getPageNumbers = () => {
    const pages = []
    const maxPagesToShow = 5

    if (totalPages <= maxPagesToShow) {
      // Show all pages if there are fewer than maxPagesToShow
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always include first and last page
      pages.push(1)

      // Calculate middle pages
      let startPage = Math.max(2, currentPage - 1)
      let endPage = Math.min(totalPages - 1, currentPage + 1)

      // Adjust if we're at the start or end
      if (currentPage <= 2) {
        endPage = 4
      } else if (currentPage >= totalPages - 1) {
        startPage = totalPages - 3
      }

      // Add ellipsis if needed
      if (startPage > 2) {
        pages.push(-1) // -1 represents ellipsis
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }

      // Add ellipsis if needed
      if (endPage < totalPages - 1) {
        pages.push(-2) // -2 represents ellipsis
      }

      // Add last page if not already included
      if (!pages.includes(totalPages)) {
        pages.push(totalPages)
      }
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className="flex justify-center items-center space-x-1 my-8">
      {/* Previous page button */}
      {currentPage > 1 && (
        <Link
          href={`${baseUrl}${currentPage - 1}`}
          className="px-3 py-2 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft size={20} />
        </Link>
      )}

      {/* Page numbers */}
      {pageNumbers.map((page, index) => {
        if (page < 0) {
          // Render ellipsis
          return (
            <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500">
              ...
            </span>
          )
        }

        return (
          <Link
            key={page}
            href={`${baseUrl}${page}`}
            className={`px-3 py-2 rounded-md transition-colors ${
              currentPage === page ? "bg-red-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {page}
          </Link>
        )
      })}

      {/* Next page button */}
      {currentPage < totalPages && (
        <Link
          href={`${baseUrl}${currentPage + 1}`}
          className="px-3 py-2 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors"
          aria-label="Next page"
        >
          <ChevronRight size={20} />
        </Link>
      )}
    </div>
  )
}
