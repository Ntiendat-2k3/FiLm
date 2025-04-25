import { getMoviesByCategory } from "@/lib/api/ophim"
import MovieCard from "@/components/MovieCard"
import Pagination from "@/components/Pagination"
import type { Metadata } from "next"
import Link from "next/link"

interface CategoryPageProps {
  params: {
    slug: string
  }
  searchParams: Promise<{
    page?: string
  }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  // We'll use the slug to create a title, but in a real app you might want to fetch the category name
  const categoryName = params.slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return {
    title: `${categoryName} Movies and TV Shows`,
    description: `Browse ${categoryName} movies and TV shows`,
  }
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  // Await the searchParams before using it
  const searchParamsData = await searchParams
  const page = Number.parseInt(searchParamsData.page || "1", 10)

  try {
    const { items: movies, params: apiParams } = await getMoviesByCategory(params.slug, page)
    const { totalPages, currentPage } = apiParams.pagination

    // Format the category name for display
    const categoryName = params.slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">{categoryName}</h1>
          <p className="text-gray-400">
            {apiParams.pagination.totalItems} movies • Page {currentPage} of {totalPages}
          </p>
        </div>

        {movies.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <h2 className="text-xl font-semibold mb-4">No movies found</h2>
            <p className="text-gray-400">We couldn't find any movies in this category.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-8">
              {movies.map((movie) => (
                <MovieCard key={movie._id} movie={movie} />
              ))}
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl={`/category/${params.slug}?page=`} />
          </>
        )}
      </div>
    )
  } catch (error) {
    console.error("Error fetching category movies:", error)

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-lg p-8 text-center">
          <h2 className="text-xl font-semibold mb-4">Unable to load category</h2>
          <p className="text-gray-400 mb-6">
            We're having trouble loading movies for this category. Please try again later.
          </p>
          <Link href="/" className="text-red-500 hover:text-red-400 transition-colors">
            Return to Home
          </Link>
        </div>
      </div>
    )
  }
}
