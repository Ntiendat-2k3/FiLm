import Link from "next/link"

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-gray-400 mb-8 text-center max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link href="/" className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors">
        Return to Home
      </Link>
    </div>
  )
}
