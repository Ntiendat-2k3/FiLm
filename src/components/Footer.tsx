import Link from "next/link"
import { SITE_NAME } from "@/lib/constants"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black text-gray-300 py-10 mt-10 border-t border-gray-800">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">{SITE_NAME}</h3>
            <p className="mb-4 text-sm">
              Watch the latest movies and TV shows online. Stream unlimited movies and TV shows on your phone, tablet,
              laptop, and TV without any subscription fees.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/danh-sach/phim-le" className="hover:text-red-500 transition-colors">
                  Movies
                </Link>
              </li>
              <li>
                <Link href="/danh-sach/phim-bo" className="hover:text-red-500 transition-colors">
                  TV Series
                </Link>
              </li>
              <li>
                <Link href="/danh-sach/hoat-hinh" className="hover:text-red-500 transition-colors">
                  Anime
                </Link>
              </li>
              <li>
                <Link href="/danh-sach/phim-moi" className="hover:text-red-500 transition-colors">
                  New Releases
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/trending" className="hover:text-red-500 transition-colors">
                  Trending
                </Link>
              </li>
              <li>
                <Link href="/top-rated" className="hover:text-red-500 transition-colors">
                  Top Rated
                </Link>
              </li>
              <li>
                <Link href="/coming-soon" className="hover:text-red-500 transition-colors">
                  Coming Soon
                </Link>
              </li>
              <li>
                <Link href="/request" className="hover:text-red-500 transition-colors">
                  Request Movie
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms" className="hover:text-red-500 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-red-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/dmca" className="hover:text-red-500 transition-colors">
                  DMCA
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-red-500 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-sm">
            &copy; {currentYear} {SITE_NAME}. All rights reserved.
          </p>
          <p className="text-xs mt-2 text-gray-500">
            This site does not store any files on its server. All contents are provided by non-affiliated third parties.
          </p>
        </div>
      </div>
    </footer>
  )
}
