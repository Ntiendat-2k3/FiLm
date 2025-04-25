"use client"

import type React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Search, Menu, X } from "lucide-react"
import { SITE_NAME } from "@/lib/constants"

export default function Navbar() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setIsMenuOpen(false)
    }
  }

  return (
    <nav className="bg-gray-900 text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-red-500">
              {SITE_NAME}
            </Link>
            <div className="hidden md:flex ml-10 space-x-8">
              <Link href="/" className="hover:text-red-500 transition-colors">
                Home
              </Link>
              <Link href="/danh-sach/phim-le" className="hover:text-red-500 transition-colors">
                Movies
              </Link>
              <Link href="/danh-sach/phim-bo" className="hover:text-red-500 transition-colors">
                TV Series
              </Link>
              <Link href="/danh-sach/hoat-hinh" className="hover:text-red-500 transition-colors">
                Anime
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search movies..."
                className="bg-gray-800 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <Search size={18} />
              </button>
            </form>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/danh-sach/phim-le"
              className="block px-3 py-2 rounded-md hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Movies
            </Link>
            <Link
              href="/danh-sach/phim-bo"
              className="block px-3 py-2 rounded-md hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              TV Series
            </Link>
            <Link
              href="/danh-sach/hoat-hinh"
              className="block px-3 py-2 rounded-md hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Anime
            </Link>
            <form onSubmit={handleSearch} className="relative mt-3">
              <input
                type="text"
                placeholder="Search movies..."
                className="bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <Search size={18} />
              </button>
            </form>
          </div>
        </div>
      )}
    </nav>
  )
}
